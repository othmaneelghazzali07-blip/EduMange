<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>calculatrice</title>
</head>
<body>

<form action="{{ route('transcolis_post') }}" method="post">
@csrf

N de colis : <input type="text" name="Ncolis"  placeholder='enter un nombre ' /><br/>
Mode de transparant :
<input type="radio" name="mode" value='express' placeholder='enter un nombre ' />
express
<input type="radio" name="mode"  value='normal' placeholder='enter un nombre ' />
Normal <br/>

Distance : <input type="text" name="distance"  placeholder='enter un nombre ' />KM<br/>
Poids : <input type="text" name="poids"  placeholder='enter un nombre ' />KG
<br/>




cout total :<input type="text" value="{{ session('couTotal') }}"   disabled={{session('disabled') }} />
<br/>
<input type="submit"  value="ok" />
<input type="reset"  value="Réinitialiser" />
</form>


</body>
</html>