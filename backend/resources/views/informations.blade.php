<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<h3>Inscription</h3>
<form action="{{ route('form_post') }}" method="post">
@csrf
<label for="nom">Nom Complet</label><br>
prénom : <input type="text" name="nom" /> 
 Nom de famille : <input type="text" name="prenom" />
 <br><br>
<label for="email">Email</label>
<input type="text" name="email" /><br>

<label for="Sexe">Sexe</label>
<select name="sexe" id="">
    <option value="femme">femme</option>
    <option value="homme">homme</option>
</select>
<br>

<input type="submit" value="Soumetter l'inscription" /><br>

</form>
@if(session("nom"))
<p>
votreNom:  <strong>{{ session("nom") }}</strong> <br>
votre sexe:<strong> {{ session("sexe") }}</strong> <br>
votre prenom: <strong>{{ session("prenom") }}</strong> <br>
votreEmail:<strong>{{ session("email") }} </strong> <br>
</p>
@endif
</body>
</html>