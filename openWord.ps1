
    $Word = New-Object -ComObject Word.Application
    $Document = $Word.Documents.Open("H:\\work\\generateTextForEmail\\GenerateTextForEmail\\documentOutput_20240603_051648.docx")

    $contentFilePath = "H:\\work\\generateTextForEmail\\GenerateTextForEmail\\documentContent_20240603_051648.html"
    $range = $Document.Range()
    $range.Collapse(1) # Collapse to start
    $range.InsertFile($contentFilePath)

    $Word.Visible = $true
  