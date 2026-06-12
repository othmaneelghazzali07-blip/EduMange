<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>calculatrice</title>
</head>
<body>
<h3>calculatrice</h3>
<form action="{{ route('calculer_post') }}" method="post">
@csrf

<input type="text" name="n" value="{{ old('n')?old('n'):'' }}" placeholder='enter un nombre ' />

<select name="operation" id="">
        <option value="">--------choisir une operation------</option>
        <option value="Addition"{{ old('operation') =='Addition'?selected:'' }}>+</option>
        <option value="soustraction" {{ old('operation') =='soustraction'?selected:'' }}>-</option>
        <option value="multiplication" {{ old('operation') =='multiplication'?selected:'' }}>x</option>
        
    </select>


<input type="text" name="m" value="{{ old('m')?old('m'):'' }} " placeholder='enter un nombre ' />
<input type="submit"  value="ok" />
</form>
@if(session('result'))

<h3>Résultat :<strong> {{ session("result") }}</strong></h3>

@endif

</body>
</html>