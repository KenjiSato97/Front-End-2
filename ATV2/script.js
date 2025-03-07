console.log('Exercício 2');



const pessoas = [
    {altura: 160, genero: 'F'},
    {altura: 170, genero: 'M'},
    {altura: 180, genero: 'F'},
    {altura: 190, genero: 'M'},
    {altura: 200, genero: 'F'},
    {altura: 210, genero: 'M'},
    {altura: 160, genero: 'F'},
    {altura: 170, genero: 'M'},
    {altura: 180, genero: 'F'},
    {altura: 190, genero: 'M'},
    {altura: 200, genero: 'F'},
    {altura: 210, genero: 'M'},
    {altura: 160, genero: 'F'},
    {altura: 170, genero: 'M'},
    {altura: 180, genero: 'F'},
];

const altura = prompt("Digite uma altura em cm: ");
const genero = prompt("Digite o gênero da pessoa (M ou F): ");
//adicionar a pessoa ao array
pessoas.push({altura: parseInt(altura), genero: genero});


const alturas = pessoas.map(pessoa => pessoa.altura);
const maiorAltura = Math.max(...alturas);
const menorAltura = Math.min(...alturas);

//calcular amedia de altura das mulheres
const mulheres = pessoas.filter(pessoa => pessoa.genero === 'F');
const alturaMulheres = mulheres.map(mulher => mulher.altura);
const mediaMulheres = alturaMulheres.reduce((acc, altura) => acc + altura, 0) / alturaMulheres.length;

//calcular a media de altura dos homens
const homens = pessoas.filter(pessoa => pessoa.genero === 'M');
const alturaHomens = homens.map(homem => homem.altura);
const mediaHomens = alturaHomens.reduce((acc, altura) => acc + altura, 0) / alturaHomens.length;

//contar o numero de pessoas do sexo feminino
const numeroMulheres = mulheres.length;

//contar o numero de pessoas do sexo masculino
const numeroHomens = homens.length;

console.log(`A maior altura é ${maiorAltura} cm`);
console.log(`A menor altura é ${menorAltura} cm`);
console.log(`A média de altura das mulheres é ${mediaMulheres} cm`);
console.log(`A média de altura dos homens é ${mediaHomens.toFixed(2)} cm`);
console.log(`O número de mulheres é ${numeroMulheres}`);
console.log(`O número de homens é ${numeroHomens}`);
