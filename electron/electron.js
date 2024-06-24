// electron/electron-main.js
import { app, BrowserWindow, globalShortcut, ipcMain, session } from "electron";

import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";
import { writeFile, copyFile } from "fs/promises";
import { promisify } from "util";
import { exec as originalExec } from "child_process";

const exec = promisify(originalExec);
const writeFileAsync = promisify(fs.writeFile);

const logFilePath = join(app.getPath("logs"), "electron-log.txt");

function logToFile(message) {
  fs.appendFileSync(logFilePath, message + "\n");
}

const isDev = import("electron-is-dev").then((module) => module.default);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const windowIcon = join(__dirname, "assets/logo_cropped.ico");

let mainWindow;
const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    icon: windowIcon,
    webPreferences: {
      preload: join(__dirname, "preload.js"), // Ensure this path is correct
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  console.log("is dev : ", await isDev);
  const startUrl = (await isDev)
    ? "http://localhost:5173"
    : `file://${join(__dirname, "../dist/index.html")}`;

  try {
    mainWindow.loadURL(startUrl);
  } catch (error) {
    logToFile(error);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.removeMenu();
  if (await isDev) {
    mainWindow.webContents.openDevTools();
  }

  clearCache();
  mainWindow.maximize();
  clearLocalStorage();
};

const clearLocalStorage = () => {
  mainWindow.webContents
    .executeJavaScript("localStorage.clear();", true)
    .then(() => {
      console.log("local storage cleared");
    })
    .catch((err) => {
      console.error("error clearing localStorage:", err);
    });
};

// app.whenReady().then(createWindow);

app.on("ready", () => {
  createWindow();
  session.defaultSession.clearCache();
  // mainWindow.webContents.openDevTools();
  const ret = globalShortcut.register("CommandOrControl+R", () => {
    mainWindow.webContents.reload();
  });

  if (!ret) {
    console.log("Registration failed");
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregister("CommandOrControl+R");
  globalShortcut.unregisterAll();
});

ipcMain.handle(
  "open-outlook",
  async (event, { emailBody, to, cc, subject }) => {
    try {
      // Clear cache
      clearCache();

      // const tempPath = app.getPath("temp");
      const tempPath = ".";

      const filePath = join(tempPath, `emailBody.html`);

      // Write the HTML content to a file
      await writeFileAsync(filePath, emailBody);
      console.log("HTML email body saved successfully.");

      // Proceed to encode the HTML content
      const encodedBody = Buffer.from(emailBody, "utf-8").toString("base64");
      const encodedSubject = Buffer.from(subject, "utf-8").toString("base64");
      const encodedTo = Buffer.from(to, "utf-8").toString("base64");
      const encodedCc = Buffer.from(cc, "utf-8").toString("base64");

      // Construct the PowerShell script content
      const scriptContent = `
        $Outlook = New-Object -ComObject Outlook.Application
        $Mail = $Outlook.CreateItem(0)

        $encodedSubject = "${encodedSubject}"
        $EncodedBody = "${encodedBody}"
        $encodedTo = "${encodedTo}"
        $encodedCc = "${encodedCc}"

        $Mail.Subject = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("$encodedSubject"))
        $Mail.HTMLBody = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("$EncodedBody"))
        $Mail.To = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("$encodedTo"))
        $Mail.CC = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("$encodedCc"))

        $Mail.Display()
      `;

      const scriptPath = join(tempPath, `sendEmail.ps1`);
      await writeFileAsync(scriptPath, scriptContent);

      // Execute the PowerShell script
      const { stdout, stderr } = await exec(
        `powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`
      );

      if (stderr) {
        console.error(`PowerShell stderr: ${stderr}`);
      }

      console.log(`PowerShell Script stdout: ${stdout}`);
    } catch (error) {
      console.error("An error occurred:", error);
      event.reply("error", error); // Notify the renderer process of the error
    }
  }
);

ipcMain.handle("open-word", async (event, { content }) => {
  try {
    // Clear cache
    clearCache();

    // const tempPath = app.getPath("temp");
    const tempPath = "./tempFiles";

    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath);
    }

    const templatePath = (await isDev)
      ? join(app.getAppPath(), "public", `responseLetterTemplate.docx`)
      : join(process.resourcesPath, `responseLetterTemplate.docx`);

    console.log(templatePath);

    const outputPath = resolve(tempPath, `documentOutput_${getDateString()}.docx`); // Path for the new document
    const contentPath = resolve(tempPath, `documentContent_${getDateString()}.html`);

    // Write the content to a file
    await writeFile(contentPath, content);

    console.log("HTML document content saved successfully.");

    // Copy the template to create a new document
    await copyFile(templatePath, outputPath);

    console.log("Template copied successfully.");

    // Ensure the file paths are formatted correctly for PowerShell
    const escapedContentPath = contentPath.replace(/\\/g, "\\\\");
    const escapedOutputPath = outputPath.replace(/\\/g, "\\\\");

    const scriptContent = `
    $Word = New-Object -ComObject Word.Application
    $Document = $Word.Documents.Open("${escapedOutputPath}")

    $contentFilePath = "${escapedContentPath}"
    $range = $Document.Range()
    $range.Collapse(1) # Collapse to start
    $range.InsertFile($contentFilePath)

    $Word.Visible = $true
  `;

    const scriptPath = join(tempPath, `openWord.ps1`);
    await writeFile(scriptPath, scriptContent);

    // Execute the PowerShell script
    const { stdout, stderr } = await exec(
      `powershell.exe -ExecutionPolicy Bypass -File "${scriptPath}"`
    );

    if (stderr) {
      console.error(`PowerShell stderr: ${stderr}`);
    }

    console.log(`PowerShell Script stdout: ${stdout}`);
  } catch (error) {
    console.error("An error occurred:", error);
    console.error(error); // Log the error instead of using event.reply
  }
});

const clearCache = () => {
  const win = BrowserWindow.getFocusedWindow();
  const session = win ? win.webContents.session : app.session.defaultSession;
  session
    .clearCache()
    .then(() => {
      console.log("Cache cleared successfully.");
    })
    .catch((err) => {
      console.error("Failed to clear cache:", err);
    });
};

ipcMain.handle("getConfig", async (event, name) => {
  if (!name) return;
  const configPath = (await isDev)
    ? join(app.getAppPath(), "public", `${name}.config.json`)
    : join(process.resourcesPath, `${name}.config.json`);

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  return config;
});


const getDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};