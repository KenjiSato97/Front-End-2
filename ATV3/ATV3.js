//Crie um array com 5 nomes e exiba o terceiro nome no console.
//Adicione um nome ao final e um no início do array.
//Remova o último nome e exiba o array atualizado.
//Use map() para criar um novo array dobrando os valores de [2, 4, 6, 8].
//Use filter() para criar um novo array apenas com números maiores que 5 em [1, 3, 5, 7, 9]
//Em javascript

let nomes = ['João', 'Maria', 'José', 'Pedro', 'Ana'];
console.log(nomes[2]);
nomes.push('Carlos');
nomes.unshift('Lucas');
nomes.pop();
console.log(nomes);

let numeros = [2, 4, 6, 8];
let dobrados = numeros.map(function(num) {
    return num * 2;
});
console.log(dobrados);

let numeros2 = [1, 3, 5, 7, 9];
let maioresQue5 = numeros2.filter(function(num) {
    return num > 5;
});
console.log(maioresQue5);


