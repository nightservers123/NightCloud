<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Night Net - Home</title>
    
    <!-- Maintenance Mode Guard -->
    <script>
        if (localStorage.getItem('night_maintenance_mode') === 'true') {
            window.location.href = 'maintenance.html';
        }
    </script>
    
    <!-- Your existing styles/scripts can go below this -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Welcome to Night Net</h1>
    </header>
    
    <main>
        <p>Your main content goes here.</p>
        <nav>
            <a href="night-play.html">Play</a>
            <a href="night-host.html">Host</a>
            <a href="night-multiplayer.html">Multiplayer</a>
            <a href="night-ai.html">Night AI</a>
        </nav>
    </main>
</body>
</html>
