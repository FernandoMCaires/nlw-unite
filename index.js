let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Fernando Muller",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 15, 40),
    dataCheckIn: new Date(2024, 2, 25, 22, 43)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 10, 15),
    dataCheckIn: new Date(2024, 2, 25, 23, 55)
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 18, 45),
    dataCheckIn: new Date(2024, 2, 28, 9, 10)
  },
  {
    nome: "Ana Santos",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 9, 0),
    dataCheckIn: new Date(2024, 2, 28, 14, 30)
  },
  {
    nome: "Pedro Costa",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 17, 20),
    dataCheckIn: new Date(2024, 2, 29, 10, 45)
  },
  {
    nome: "Juliana Pereira",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 11, 50),
    dataCheckIn: new Date(2024, 2, 29, 20, 15)
  },
  {
    nome: "Rafael Rodrigues",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 16, 30),
    dataCheckIn: new Date(2024, 2, 30, 12, 0)
  },
  {
    nome: "Luiza Almeida",
    email: "luiza@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 8, 10),
    dataCheckIn: new Date(2024, 2, 30, 18, 30)
  }
];




const criarNovoParticipante = (participante) => {
  
  const dataInscricao = dayjs(Date.now()).to (participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
      <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
       Confirmar check-in 
      
      </button>
    `
  }
  
  
  return `
  <td>
        <strong>
       ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
        </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `

}


const atualizarLista = (participantes) => {
  let output = ""

  //estrutura de repetição - loop
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

//adicionar participante

const adicionarParticipante = (event) =>{
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p)=> p.email == participante.email
    
  )
  
  if (participanteExiste){
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulário
  event.target.querySelector('[name:"nome"]').value=""
  event.target.querySelector('[name:"email"]').value=""


}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check in?'
  if(confirm(mensagemConfirmacao) == false){
    return
  }
  //encpntrar o participante dentro da lista
  const participante = participantes.find(
    (p)=> p.email == event.target.dataset.email
)
  //apos isso atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista de participantes
  atualizarLista(participantes)

}