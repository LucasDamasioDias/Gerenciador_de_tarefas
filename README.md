📝 Gerenciador de Tarefas (CLI) – Node.js

Um gerenciador de tarefas simples em linha de comando, desenvolvido em Node.js, utilizando manipulação de arquivos JSON para persistência dos dados.
O usuário pode criar, editar, listar, iniciar, concluir e excluir tarefas, além de importar/exportar a lista completa.

🚀 Funcionalidades

Criar tarefas
Cada tarefa recebe automaticamente:

id único (UUID)

título

descrição

data de criação

status inicial "pendente"

data de conclusão (null até ser concluída)

Iniciar tarefa
Atualiza o status para "em andamento".

Listar tarefas
Exibe ID, título e status de todas as tarefas cadastradas.

Filtrar por status
Lista somente as tarefas que possuem o status escolhido.

Editar tarefa
Permite alterar título e descrição a partir do ID informado.

Marcar como concluída
Define status como "concluída" e registra a data de conclusão.

Excluir tarefa
Remove uma tarefa com base no ID.

Importar lista
Carrega tarefas a partir do arquivo tarefas.json.

Exportar lista
Salva todas as tarefas no arquivo tarefas.json.

🛠 Tecnologias utilizadas

Node.js

prompt-sync para entrada de dados

fs para manipulação de arquivos

crypto.randomUUID() para geração de IDs únicos

JSON para armazenamento persistente

📂 Estrutura do Projeto
/seu-projeto
 ├── tarefas.json
 ├── index.js (ou nome que você escolher)
 └── README.md

Como executar

1. Instale as dependências (se usar prompt-sync):
   npm install prompt-sync
2. Execute o programa:
  node index.js
3. O menu aparecerá no console:
   1 - Criar tarefa
2 - Iniciar tarefa
3 - Listar tarefas
4 - Listar por status
5 - Editar tarefa
6 - Marcar como concluída
7 - Excluir tarefa
8 - Exportar/Importar JSON
9 - Sair

📌 Estrutura de uma tarefa
{
  "id": "d71b5582-8e7e-4b5b-b180-7f517af9e889",
  "titulo": "Estudar Node.js",
  "descricao": "Criar um projeto CLI",
  "criacao": "2025-01-20T02:14:00.123Z",
  "status": "pendente",
  "conclusao": null
}

🔒 Observações importantes

Toda alteração é salva automaticamente no arquivo tarefas.json.

Se o arquivo não existir, ele será criado após a primeira tarefa cadastrada.

O programa valida entradas como:

títulos vazios

IDs inexistentes

operações proibidas (ex: iniciar tarefa já concluída)

📘 Aprendizados e Objetivo do Projeto

Este projeto faz parte de um conjunto de exercícios voltados para:

Reforçar lógica de programação

Versionamento no GitHub

Manipulação de arquivos em Node.js

Boas práticas de CLI apps

Construção de portfólio profissional

📄 Licença

Este projeto é livre para uso educacional e pode ser reutilizado para estudo ou expansão.
