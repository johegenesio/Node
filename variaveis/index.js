function testeVar() {
    if (true) {
        var X = 10
        console.log(`Valor de X dentro do bloco: ${X}`)
    }
    console.log(`Valor de X fora do bloco: ${X}`)
}
function testeLet() {
    if (true) {
        let Y = 20
        console.log(`Valor de Y dentro do bloco: ${Y}`)
    }
    //console.log(`Valor de Y dentro do bloco: ${Y}`)
        //ReferenceError: Y is not defined, ou seja, a variável Y não recebe o valor fora do bloco
}
testeVar(),
testeLet()