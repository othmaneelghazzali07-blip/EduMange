<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>


    <h1>Liste des Notes</h1>
    <form action="">
        @csrf
        <input type="text" name='value' placeholder="Entrez un nom ">
        <button type="submit">Recherche</button>
    </form>

<table border="1">
    <tr>
        <td>Nome</td>
        <td>Note</td>
    </tr>
    @foreach( $notes as $key=>$note )
        @if ($note>10)
        <tr style="background-color:green">
           <td>{{$key}}</td>
<td>{{$note}}</td>

            </tr> 
        @elseif ($note>=8)
     <tr style="background-color:orange">
           <td>{{$key}}</td>
<td>{{$note}}</td>

            </tr> 
        @else 
             <tr style="background-color:red">
           <td>{{$key}}</td>
<td>{{$note}}</td>

            </tr> 
            
@endif
    
    @endforeach
 </table>
</body>
</html>

