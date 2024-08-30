let nome = 'João' //Global, local e é de Bloco

let nome2 //declarar variavel
name2 = 'Pedro' //atribui o valo Pedrona variável

//quando eu declaro e atribuo valor nas variáveis acostumamos dizer que instanciamos ou inicializamos

function func1() {
    var sobrenome = 'Genesio' //Global e local
    console.log(`Olá, ${sobrenome}`)
}

function func2() {
    var sobrenome = 'Genesio' //Global e local
    console.log(`Olá, ${nome} ${sobrenome}`)
}

func1(),
func2()