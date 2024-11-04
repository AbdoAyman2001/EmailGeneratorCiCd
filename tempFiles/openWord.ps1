
    $Word = New-Object -ComObject Word.Application
    $Document = $Word.Documents.Open("H:\\work\\generateTextForEmail\\GenerateTextForEmail\\tempFiles\\documentOutput_20240603_074110.docx")

    $contentFilePath = "H:\\work\\generateTextForEmail\\GenerateTextForEmail\\tempFiles\\documentContent_20240603_074110.html"
    $range = $Document.Range()
    $range.Collapse(1) # Collapse to start
    $range.InsertFile($contentFilePath)

    $Word.Visible = $true
  