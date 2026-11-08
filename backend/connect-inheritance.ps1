$file = "server.js"
$content = Get-Content $file -Raw

if ($content -notmatch 'inheritanceRoutes') {
    $content = $content.Replace(
        'const landRoutes = require("./routes/land.routes");',
        'const landRoutes = require("./routes/land.routes");' + "`r`n" +
        'const inheritanceRoutes = require("./routes/inheritance.routes");'
    )

    $content = $content.Replace(
        'app.use("/api/lands", landRoutes);',
        'app.use("/api/lands", landRoutes);' + "`r`n" +
        'app.use("/api/inheritance", inheritanceRoutes);'
    )

    Set-Content -Path $file -Value $content -Encoding UTF8
    Write-Host "Inheritance API connected!"
} else {
    Write-Host "Inheritance API already connected."
}
