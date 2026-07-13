$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx"
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $n = $c -replace ' dark:text-gray-\d+', ''
    if ($c -ne $n) {
        Set-Content -Path $f.FullName -Value $n -NoNewline
        Write-Host "Updated: $($f.FullName)"
    }
}
Write-Host "Done."
