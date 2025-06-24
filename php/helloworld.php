<?php
  $show_more = false;
  if (isset($_POST['toggle'])) {
      $show_more = ($_POST['toggle'] === 'show');
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello World in PHP</title>
    <link rel="stylesheet" href="../navbar.css" />
    <link rel="stylesheet" href="/style.css" />
  </head>
<body>
  <div id="nav"></div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      fetch('../navbar.html')
          .then(response => response.text())
          .then(data => {
              document.getElementById('nav').innerHTML = data;
          });
    });
  </script>
  <div class="overlay-box-b">
    <header>
      <h1>Header</h1>
      <p class="intro">My name is Christopher May. This is my website for CPSC 3750 Summer 2025</p>
      <p>Click "Show More" to see my CSS2 website with a dynamic view using php</p>
      
        <form method="post">
          <?php if (!$show_more): ?>
            <button type="submit" name="toggle" value="show">Show More</button>
          <?php endif; ?>
        </form>
        
      <?php if ($show_more): ?>
        <h2>Content</h2>
          <section>
            <h2>Ordered List (Favorite Languages in Order)</h2>
            <ol>
              <li>C/C++</li>
              <li>Python</li>
              <li>C#</li>
              <li>HTML/JS</li>
              <li>Binary</li>
              <li>Hammer & Chisel</li>
              <li>Java</li>
    
            </ol>
          
            <h2>Unordered List (Hobbies)</h2>
            <ul>
              <li>Racing</li>
              <li>Coding</li>
              <li>Video Games</li>
            </ul>
          </section>
          <main>
            <h2>Gallery</h2>
            <div class="gallery">
              <img src="/pics/milo.jpg" alt="Milo">
              <img src="/pics/friends.jpg" alt="Friends">
              <img src="/pics/belle.jpg" alt="Belle">
              <img src="/pics/908.jpg" alt="908">
              <img src="/pics/mustang.jpg" alt="Mustang">
              <img src="/pics/909.jpg" alt="909">
            </div>
            <h2>Icons</h2>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <div class="social-icons" margin-bottom="1em">
              <a href="https://github.com/cmay25009" class = "fa fa-github"></a>
              <a href="https://www.instagram.com/crittermay_/" class = "fa fa-instagram"></a>
              <a href="https://www.linkedin.com/in/christopher-may-23580b176/" class = "fa fa-linkedin"></a></div>
              
            
            </main>
            <?php endif; ?>
    </header>
      <footer>
        <?php if($show_more): ?>
            <form method="post">
              <button type="submit" name="toggle" value="hide">Show Less</button>
            </form>
        <?php endif; ?>
        
        <p><br><strong>Back to <a href="/index.html">Home</strong></a></p>
      </footer>
  </div>
</body>
</html>