$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx"
foreach ($f in $files) {
    $lines = Get-Content $f.FullName
    $changed = $false
    $newLines = $lines | ForEach-Object {
        $line = $_
        # Replace hover:text-primary on outline/ghost buttons and links (not bg-primary buttons which should stay yellow)
        # Replace group-hover:text-primary-hover (job card title)
        if ($line -match "group-hover:text-primary-hover") {
            $line = $line -replace "group-hover:text-primary-hover", "group-hover:text-gray-600"
            $changed = $true
        }
        # Replace hover:border-primary/40 (job card border)
        if ($line -match "hover:border-primary/40") {
            $line = $line -replace "hover:border-primary/40", "hover:border-gray-300"
            $changed = $true
        }
        # Replace hover:text-primary on icon buttons (bookmarks, back arrows etc.)
        if ($line -match "hover:text-primary" -and $line -notmatch "bg-primary" -and $line -notmatch "text-primary hover:text-primary-hover") {
            $line = $line -replace "hover:text-primary(?!-hover)", "hover:text-gray-700"
            $changed = $true
        }
        $line
    }
    if ($changed) {
        Set-Content -Path $f.FullName -Value $newLines
        Write-Host "Updated: $($f.FullName)"
    }
}
Write-Host "Done."
