Entidade anêmica => Só armazena dados e não possui comportamentos

Características de uma entidade:
- Possui identidade (id único)
- Possui propriedades que podem ser alteradas com o tempo
- Tem comportamentos
- Contém regras de negócio
  - Regras de negócio são formas de mudar o comportamento da entidade aplicando
  validações, formulas, etc

Pensar nos atributos quando for criar uma entidade

Quais são os motivos para mudança (regras de negócio)?

Entidade vai ter que sempre representar o estado correto e atual daquele elemento
- Garantir que os dados da entidade estão consistente 100% das vezes
  - Minha entidade não está consistente quando só depois de criar o objeto eu vou
  adicionando os atributos. Uma vez que ela está incosistente, ela não consegue
  validar as regras de negócio, é uma entidade incompleta, não serve pra nada. Quando 
  estamos falando de DDD, precisamos confiar 100% no estado atual do objeto
-> Os dados a todos os momentos devem estar consistentes <-

Regra de ouro para manter consistência da entidade:
- Uma entidade por padrão sempre vai ter que se autovalidar

Entidade vs ORM
Essa minha entidade abaixo é voltada para o negócio, não para persistência, diferente
de uma entidade de ORM (model).

Pare de chamar entidades que você trabalha com banco de dados de entidade, chame de model.
Entidade é algo que você trabalha com regras de negócio, não com banco de dados.

'''
Complexidade de negócio
Domain
- Entity (fala com negócio)
-- customer.ts (regra de negócio)

Complexidade acidental (podem ser substituídos, sou eu que coloco essa complexidade)
Infra (fala com o mundo externo)
- Entity/model
-- customer.ts (get, set)
'''

--- Value Objects ---
Representam um valor imutável dentro do domínio da aplicação, sem uma identidade
própria.

Quando você se preocupa apenas com os atributos (e não os comportamentos) 
de um elemento, classifique isso como um Value Object.

Trate o Value Object como imutável. 
Address:
- Você não muda de número, você não muda de estado, você troca de endereço.

Não posso alterar uma das características, mas sim instanciar um novo objeto (imutabilidade)

Value Objects são uma ferramenta poderosa para modelar conceitos que são definidos por seus atributos e não precisam de uma identidade única. Eles promovem a imutabilidade, a reutilização e a clareza no código, tornando-o mais seguro e fácil de manter.

--- Agreggates

Trata-se de uma coleção de objetos que são tratados como uma única unidade para
propósito de manter a consistência dos dados e aplicação das regras de negócio.

1. Aggregate Root: Cada agregado tem uma raiz que é um objeto específico dentro do agregado e atua como entrada principal para o agregado. Responsável por garantir a consistência do agregado como um todo.
2. Consistência: Todas as mudanças dentro um agregado devem ser consistentes. Isso implica que qualquer modificação em um objeto do agregado deve ser realizado pelo Aggregate Root.
3. Encapsulamento: Os objetos dentro de um agregado são encapsulados e não podem ser acessados diretamente de fora do agregado. Objetivo é manter a integridade dos dados e aplicar as regras de negócio.
4. Identidade: O agregado é identificado pela identidade da sua raiz

É um conjunto de objetos associados que tratamos como uma única
unidade para próposito de mudança de dados.

--- Serviços de domínio
- Encapsulam lógica de negócio que não se encaixam naturalmente na entidade ou objeto de valor
- Usados para operações que envolvem múltiplas entidades ou que não pertencem a nenhuma entidade específica
- São por padrão stateless (não armazenam dados internamente)

--- Repositórios
- Local de armazenamento
- Meu dominio não precisa conhecer a implementação do meu repositório (evitar acoplamentos através de iterfaces)

Modelar o meu banco de dados com base no meu domínio
Meu domínio é total agnóstico ao meu banco de dados

Manter os dados em um estado correto ao retorná-los do banco de dados (no mesmo esquema
das entidades) 

DDD exige que minhas entidades sempre mantenham um estado correto

O maior objetivo dos repositórios não é a busca, mas remontar os objetos da
forma mais cuidadosa seguindo as entidades

1 repositório por agregado

--- Domain events

Use um evento de domínio para capturar uma ocorrência de algo que aconteceu no
domínio

Guardar o histórico de tudo que está ocorrendo no meu sistema

Todo evento deve ser representado em uma ação realizada no passado
- UserCreated
- OrderPlaced
- EmailSent

Quando utilizar? Quando queremos notificar outros Bounded Contexts de uma
mudança de estado

Componentes
- Event (evento que acontece)
- Handler (ação que é executada quando um evento é emitido): Executa o processamento 
quando um evento é chamado
- Event Dispatcher: Responsável por armazenar e executar os handlers de um evneto
quando ele for disparado

Dinâmica
- Criar um "Event Dispatcher"
- Criar um "Evento"
- Criar um "Handler" para o "Evento"
- Registrar o Evento, juntamente com o Handler no "Event Dispatcher"

Agora para disparar um evento, basta executar o método "notify" do "Event Dispatcher". 
Nesse momento todos os Handlers registrados no evento serão executados