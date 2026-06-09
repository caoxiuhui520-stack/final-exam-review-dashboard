param(
  [Parameter(Mandatory = $true)]
  [string]$SourceDirectory,
  [string]$OutputFile = "work/source-content-inventory.txt"
)

$ErrorActionPreference = "Stop"
$files = Get-ChildItem -LiteralPath $SourceDirectory -Recurse -File |
  Where-Object { $_.Extension -in ".docx", ".pptx" -and -not $_.Name.StartsWith("~$") }

$lines = foreach ($file in $files) {
  "=== $($file.FullName) ==="
  $archive = [System.IO.Compression.ZipFile]::OpenRead($file.FullName)
  try {
    $entries = if ($file.Extension -eq ".docx") {
      $archive.Entries | Where-Object FullName -eq "word/document.xml"
    } else {
      $archive.Entries | Where-Object FullName -like "ppt/slides/slide*.xml"
    }
    foreach ($entry in $entries) {
      $reader = [System.IO.StreamReader]::new($entry.Open())
      try {
        [xml]$xml = $reader.ReadToEnd()
        ($xml.InnerText -replace "\s+", " ").Trim()
      } finally {
        $reader.Dispose()
      }
    }
  } finally {
    $archive.Dispose()
  }
}

$parent = Split-Path -Parent $OutputFile
if ($parent) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
$lines | Set-Content -LiteralPath $OutputFile -Encoding UTF8
Write-Output "Wrote $($files.Count) source files to $OutputFile"
