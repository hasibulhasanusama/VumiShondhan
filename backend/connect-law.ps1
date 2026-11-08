$file = "server.js"
$content = Get-Content $file -Raw

if ($content -notmatch 'lawRoutes') {
    $content = $content.Replace(
        'const landRoutes = require("./routes/land.routes");',
        'const landRoutes = require("./routes/land.routes");' + "`r`n" +
        'const lawRoutes = require("./routes/law.routes");'
    )

    $content = $content.Replace(
        'app.use("/api/lands", landRoutes);',
        'app.use("/api/lands", landRoutes);' + "`r`n" +
        'app.use("/api/law", lawRoutes);'
    )

    Set-Content -Path $file -Value $content -Encoding UTF8
    Write-Host "Law API connected!"
} else {
    Write-Host "Law API already connected."
}
