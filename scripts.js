const button = document.querySelector(".button-add-task")
const input = document.querySelector(".input-task")
const listaCompleta = document.querySelector(".list-tasks")

// definindo a lista que será criada quando para add as tasks
let minhaListaDeItens = []



function adicionarNovaTarefa() {
    // o push adiciona algo no array
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    // limpa o campo após realizar a função
    input.value = ""
    mostrarTarefas()
}

function mostrarTarefas() {

    // cria um novo li
    let novaLi = ''

    // for each vai passar por cada item da lista
    minhaListaDeItens.forEach((item, posicao) => {

        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}">
                <img src="img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})" />
                <p>${item.tarefa}</p>
                <img src="img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})" />
            </li>`
    })
    listaCompleta.innerHTML = novaLi

    // como guardar as informações no localstorage
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao) {
    // o novo valor é minhaListaDeItens invertido
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    mostrarTarefas()
}

function deletarItem(posicao) {
    // splice deleta itens de array
    minhaListaDeItens.splice(posicao, 1)

    // tenho que chamar a função de mostrar as tarefas novamente
    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (localStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    console.log(tarefasDoLocalStorage)

    mostrarTarefas()
}

recarregarTarefas()
// toda vez que ocorrer um clique no botão aciona a função pegarOValorDoImput
button.addEventListener('click', adicionarNovaTarefa)