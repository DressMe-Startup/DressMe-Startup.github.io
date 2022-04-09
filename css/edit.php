
<?php
if(isset($_GET['edit'])){
  $idEdit=$_GET['edit'];

$select = "select * from users where id='$idEdit'";
$run = mysqli_query($con, $select);

$row=mysqli_fetch_array($run);
  $nameU=$row['name'];
  $passU=$row['password'];
  $emailU=$row['email'];
}

?>
<br/>
<form  method="post" action="" >
<input  type="text" name="u_name" value="<?php echo $nameU;?>"/><br>
<input type="password" name="u_pass" value="<?php echo $passU;?>"/><br>
<input type="email" name="u_email" value="<?php echo $emailU;?>"/><br>
<input type="submit" name="update" value="Update Data"/>


</form>

<?php
if(isset($_POST['update'])){  //se qualcosa è accaduto, click
     $nameUP = $_POST['u_name'];
     $passUP = $_POST['u_pass'];
     $emailUP = $_POST['u_email'];

    $update = "update users set name='$nameUP', password='$passUP', email='$emailUP' where id='$idEdit' ";
    $update_run = mysqli_query($con,$update);

    if($update_run){
      echo "<script>alert('Data has been updated')</script>";
      echo "<script>window.open('form.php', '_self')</script>";
    }
}
?>
