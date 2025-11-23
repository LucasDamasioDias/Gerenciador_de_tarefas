rodando = true;
const prompt = require('prompt-sync')(); 
const fs = require('fs');
let tarefas = [];
const crypto = require('crypto');


const status = {
  PENDENTE: "pendente",
  EM_ANDAMENTO: "em andamento",
  CONCLUIDA: "concluída"
};

function criar_tarefa() {    
    try {
        const now = new Date();
        const id = crypto.randomUUID();

        let titulo = prompt('Insira o título da tarefa:');
        if (!titulo) {
            console.log("O título não pode ser vazio!");
            return;
        }

        let descricao = prompt('Insira a descrição da tarefa:');
        if (!descricao) {
            console.log("A descrição não pode ser vazia!");
            return;
        }

        tarefas.push({id, titulo, descricao, criacao: now, status: status.PENDENTE, conclusao: null});
        
        fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));

        console.log("Tarefa criada com sucesso!");

    } catch (e) {
        console.log("Erro ao criar tarefa:", e.message);
    }
};

function iniciar_tarefa() {
    let nome = prompt('Digite o título da tarefa a ser iniciada:');

    let tarefa = tarefas.find(t => t.titulo === nome);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    if (tarefa.status === status.CONCLUIDA) {
        console.log("Esta tarefa já foi concluída e não pode ser reiniciada.");
        return;
    }

    if (tarefa.status === status.EM_ANDAMENTO) {
        console.log("Esta tarefa já está em andamento.");
        return;
    }

    tarefa.status = status.EM_ANDAMENTO;
    console.log("Tarefa iniciada!");

    fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));
};


function listar_tarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach(t => {
        console.log(`ID: ${t.id} | Título: ${t.titulo} | Status: ${t.status}`);
    });
};

function listar_por_status() {
    let status_escolhido = prompt("Insira o status a ser filtrado:");

    let tarefas_filtradas = tarefas.filter(t => t.status === status_escolhido);

    if (tarefas_filtradas.length === 0) {
        console.log("Nenhuma tarefa encontrada com esse status.");
        return;
    }

    tarefas_filtradas.forEach(t => {
        console.log(`- ${t.titulo}`);
    });
};

function editar_tarefa() {
    let id_tarefa = prompt('Digite o ID da tarefa a ser editada:');
    let tarefa_editada = tarefas.find(t => t.id === id_tarefa);
    
    if (!tarefa_editada){
        console.log("Nenhuma tarefa com esse ID foi encontrada!");
        return;
    }
    
    let novo_titulo = prompt("Insira o novo título da tarefa: ");
    let nova_descricao = prompt("Insira a nova descrição da tarefa: ");
    
    if (!novo_titulo){
        console.log("O título não pode ser vazio!");
        return;
    }

    tarefa_editada.titulo = novo_titulo;
    tarefa_editada.descricao = nova_descricao;

    fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));
    console.log("Tarefa editada com sucesso!");
}

function marcar_concluida() {

    let id = prompt('Digite o ID da tarefa a ser concluída:');
    let tarefa_concluida = tarefas.find(t => t.id === id);

    if (!tarefa_concluida){
        console.log("Nenhuma tarefa com esse ID foi encontrada!");
        return;
    }

    if (tarefa_concluida.status === status.CONCLUIDA) {
        console.log("A tarefa já está concluída.");
        return;
    }

    tarefa_concluida.status = status.CONCLUIDA;
    tarefa_concluida.conclusao = new Date();
    
    fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));
    console.log("Tarefa marcada como concluída!");
}


function excluir_tarefa() {
    let id_tarefa = prompt('Digite o ID da tarefa a ser excluída:');

    const index = tarefas.findIndex(t => t.id === id_tarefa);

    if (index === -1) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefas.splice(index, 1);

    fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));

    console.log("Tarefa excluída com sucesso!");
};


function importar_lista() {
     try {
         const data = fs.readFileSync('tarefas.json', 'utf8');
         tarefas = JSON.parse(data); 
         console.log("Lista importada com sucesso!"); 
        } catch (error) {
             console.log("Erro ao importar:", error.message); 
            } 
        }; 
        
function exportar_lista() {
     try {
         fs.writeFileSync('tarefas.json', JSON.stringify(tarefas, null, 2));
         console.log("Lista exportada com sucesso!"); 
        } catch (error) {
             console.log("Erro ao exportar:", error.message); 
            } 
        };

function menu(){
     console.log("Escolha uma das opções a seguir: "); 
     console.log("1 - Criar tarefa."); 
     console.log("2 - Iniciar tarefa."); 
     console.log("3 - Para listar tarefas."); 
     console.log("4 - Listar por status."); 
     console.log("5 - Para editar tarefa."); 
     console.log("6 - Para marcar como concluída."); 
     console.log("7 - Excluir tarefa."); 
     console.log("8 - Exportar/importar JSON."); 
     console.log("9 - Para sair.");    
     let opcao = Number(prompt()); 
     return opcao; 
    } 
    
while(rodando){
    try{
        switch(menu()){
            case 1: 
                criar_tarefa(); 
                break; 
            case 2:
                iniciar_tarefa();
                break;    
            case 3: 
                listar_tarefas();
                break; 
            case 4:
                listar_por_status();
                break;
            case 5:
                editar_tarefa();
                break;
            case 6: 
                marcar_concluida(); 
                break;                      
            case 7: 
                excluir_tarefa(); 
                break;
            case 8:
                let x = Number(prompt("Digite 1 para importar ou 2 para exportar:"));
                if (x === 1){
                    importar_lista();
                    break;
                }else if (x === 2){
                    exportar_lista();
                    break;
                } else {
                    console.log("Opção inválida");
                    break;
                }                
            case 9: 
                rodando = false; 
                console.log("Encerrando..."); 
                break;  
            default:
                console.log("Opção inválida!"); 
            } 
        } catch(e){ 
            console.log("Digite uma opção válida!") 
    }; 
};