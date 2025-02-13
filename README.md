
# Build Extensions with SAP Cloud Application Programming Model (CAP)

[1. Introdução](#1-introdução)<br>
    [1.1 Instanciando o Build Code](#11-instanciando-o-build-code)<br>
    [1.2 Explicando o projeto](#12-explicando-o-projeto)<p>
[2. Explorando o CAP](#2-explorando-o-cap)<br>
    [2.1 Criando o projeto](#21-criando-o-projeto)<br>
    [2.2 Criando a entidade *Incidents*](#22-criando-a-entidade-incidents)<br>
    [2.3 Usando aspectos pré-definidos](#23-usando-aspectos-pré-definidos)<br>
    [2.4 Criando a entidade *Conversations*](#24-criando-a-entidade-conversations)<br>
    [2.5 Criando as entidades *Status* e *Urgency*](#25-criando-as-entidades-status-e-urgency)<br>
    [2.6 Criando um serviço CDS simples](#26-criando-um-serviço-cds-simples)<br>
    [2.7 Executando a aplicação](#27-executando-a-aplicação)<br>
    [2.8 Adicionando dados de exemplo](#28-adicionando-dados-de-exemplo)<br>
    [2.9 Adicionando uma UI simples](#29-adicionando-uma-ui-simples)<br>
    [2.10 Adicionando regras de negócio](#210-adicionando-regras-de-negócio)<br>
    [2.11 Criando um serviço CDS mais complexo](#211-criando-um-serviço-cds-mais-complexo)<p>
[3. Integrando a aplicação com o SAP S/4 HANA](#3-integrando-a-aplicação-com-o-sap-s4-hana)<br>
    [3.1 Adicionando um pacote de integração](#31-adicionando-um-pacote-de-integração)<br>
    [3.2 Adicionando entidades e serviços para integração com o S/4](#32-adicionando-entidades-e-serviços-para-integração-com-o-sap-s4-hana)<br>
    [3.3 Testando com dados simulados](#33-testando-com-dados-simulados)<br>
    [3.4 Delegando chamadas para o S/4](#34-delegando-chamadas-para-o-sap-s4-hana)<br>
    [3.5 Testando com dados vindo do S/4](#35-testando-com-dados-vindo-do-sap-s4-hana)<br>
    [3.6 Enriquecendo a UI](#36-enriquecendo-a-ui)<br>
    [3.7 Testando com UI](#37-testando-com-ui)<p>
[4. Lidando com Replicações e Eventos](#4-lidando-com-replicações-e-eventos)<br>
    [4.1 Replicando dados sob demanda](#41-replicando-dados-sob-demanda)<br>
    [4.2 Testando replicação sob demanda](#42-testando-replicação-sob-demanda-sem-ui)<br>
    [4.3 Replicação de dados baseada em evento](#43-replicação-de-dados-baseada-em-evento)<br>
    [4.4 Reagindo a eventos](#44-reagindo-a-eventos)<br>
    [4.5 Emitindo eventos do servidor simulado](#45-emitindo-eventos-do-servidor-simulado)<br>
    [4.6 Juntando tudo](#46-juntando-tudo)<br>

---

## 1. Introdução
Este repositório contém o material para a sessão SAP BTP Experience 2025 chamada *Build Extensions with SAP Cloud Application Programming Model*.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 1.1 Instanciando o Build Code

Para realização do hands-on, é necessário o acesso à uma conta do BTP com o SAP Build Code contratado.

> Alternativamente, uma conta trial do BTP poderá ser criada para realização do hands-on. Para tanto, siga o tutorial [Get an Account on SAP BTP Trial](https://developers.sap.com/tutorials/hcp-create-trial-account.html).

Após, será necessário instanciar o SAP Build Code. Para tanto, siga o tutorial [Setup SAP Build Code in SAP BTP](https://developers.sap.com/tutorials/build-code-setup.html).

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 1.2 Explicando o projeto

Nesse hands-on utilizaremos o SAP Cloud Application Programming Model (CAP) para criar uma aplicação de Gestão de Incidentes.

Utilizando a aplicação, um cliente poderá criar um incidente. Cada incidente possuirá um título, um status e um nível de urgência, e conterá um histórico de conversas com várias mensagens.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

## 2. Explorando o CAP

No primeiro exercício, iremos explorar as funcionalidades básicas do Cloud Application Programming Model (CAP) e do SAP Build Code.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.1 Criando o projeto

Na sua subaccount no BTP, navegue para *Instances and Subscriptions* no menu lateral esquerdo.
<br>![Instances and Subscriptions](/assets/2.1.1.instances-and-subscriptions.png)

Em Applications, clique no serviço SAP Build Code. A ferramenta abrirá em uma nova aba do navegador.
<br>![Access Sap Build Code](/assets/2.1.2.access-sap-build-code.png)

Dentro da ferramenta, acesse a opção Criar > Criar.
<br>![create-project-build](/assets/2.1.3.create-project-build.png)

Na janela que se abrirá, escolha "Criar um aplicativo" e, após, a opção "SAP Build Code". Por fim, escolha a opção "Full-Stack Application".

Preencha o formulário com os dados do projeto. Para o presente hands-on, utilizaremos as seguintes informações:
- Nome do projeto: incidents_mgt
- Pilha de desenvolvimento: Node
- Área do desenvolvedor: btpexp25_extensions_with_cap

O formulário deve estar preenchido como a seguir:
<br>![Form Project Data](/assets/2.1.4.form-project-data.png)

Após o preenchimento do formulário, aperte o botão Criar. Você será direcionado novamente para o Lobby do SAP Build, e o projeto se encontrará com status "Criação Pendente".

Quando o projeto for criado, clique nele para acessar o ambiente de desenvolvimento.
<br>![Project Created](/assets/2.1.5.project-created.png)

Você será direcionado para o SAP Business Application Studio, na visão Storyboard do projeto. Essa visão permitirá a criação e edição da aplicação com uma abordagem gráfica e visual.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.2 Criando a entidade *Incidents*

Nessa aula vamos criar a nossa primeira [entidade](https://cap.cloud.sap/docs/cds/cdl#entities).

Entidades são estruturas com elementos nomeados e de tipos definidos, representando conjuntos de dados (persistidos) que podem ser lidos e manipulados usando operações CRUD usuais.

Na seção Data Models, escolha a opção de criar uma nova entidade. Como é a primeira entidade criada, a ferramenta solicitará a definição de um namespace. Mantenha o valor padrão já preenchido (incidents_mgt) e escolha a opção create.
<br>![Create Entity](/assets/2.2.1.create-entity.png)

A ferramenta de criação das entidades será carregada em uma nova aba do SAP BAS, com uma entidade já criada. Selecione a entidade e aperte o botão "Show Details".
<br>![Entity Show Details](/assets/2.2.2.entity-show-details.png)

Renomeie a entidade para Incidents e adicione uma nova propriedade. Dê à ela o nome de title e remova o valor de Length que vem preenchido por padrão.
<br>![Incidents Details](/assets/2.2.3.incidents-details.png)

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.3 Usando aspectos pré-definidos

A utilização de campos-chave `ID` é tão comum que existe um aspecto CDS pré-construído disponível chamado [cuid](https://cap.cloud.sap/docs/cds/common#aspect-cuid) que o fornece.

Além disso, a entidade `Incidents` deverá conter informações sobre quando foi criada e atualizada e por quem. Existe um aspecto [managed](https://cap.cloud.sap/docs/cds/common#aspect-managed) que faz isso.

O modelo pré-construído [@sap/cds/common](https://cap.cloud.sap/docs/cds/common) fornece tipos e aspectos comuns para aplicações empresarias, que podem ser aplicados e reutilizados em diversas entidades.

Para importação dos aspectos, acesse o botão Import no canto superior direito, e depois a opção "Common Types".
<br>![Import Common Types](/assets/2.3.1.import-common-types.png)

Na janela que é carregada, selecione as opções cuid e managed e, após, aperte select para confirmar a importação.

Novamente, navegue para os detalhes da entidade Incidents.

Na aba "Properties", exclua a propriedade ID. Ela será reinserida pelo aspecto cuid.

Na aba "Aspects" selecione os aspectos que acabamos de importar.
<br>![Incidents Details Aspects](/assets/2.3.2.incidents-details-aspects.png)

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.4 Criando a entidade *Conversations*

Um incidente deve conter uma série de mensagens para construir um histórico de conversação, e para isso, vamos criar uma nova entidade.

Adicione uma nova entidade apertando o botão "Add Entity".
<br>![Add Entity](/assets/2.4.1.add-entity.png)

Repita os passos utilizados na criação da entidade `Incidents` e renomeie a entidade que foi criada para *Conversations*. Adicione nela as seguintes propriedades:
- timestamp, do time DateTime
- author, do tipo String com limite de 100 caracteres
- message do tipo String, sem limite de caracteres

Ative na entidade os aspects `cuid` e `managed`.

Agora vamos inserir um relacionamento entre as entidades. Para tanto, selecione a entidade `Incidents` e aperte o botão "Add Relationship".
<br>![Incident Add Relationship](/assets/2.4.2.incidents-add-relationship.png)


Arraste a ligação até a última linha da entidade Conversations. Na janela que se abrirá, altere o tipo de relação de *Association* para *Composition*. O preenchimento deverá aparecer assim:
<br>![Incident Relationship Details](/assets/2.4.3.incidents-relationship-details.png)

Após selecionar *OK*, as entidades estarão relacionadas.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.5 Criando as entidades *Status* e *Urgency*

Os incidentes deverão ter mais dois campos `status` e `urgency`, que são *code lists*, ou seja, dados de configuração.

Repetindo os passos anteriores, importe o aspecto pré-construído `sap.common.CodeList`.

Adicione uma nova entidade chamada `Status` e ative nela o aspecto `sap.common.CodeList`.

Altere o nome do campo `ID`para `code` e o seu tipo para String, sem limite de caracteres.

Selecione novamente a entidade `Incidents` e selecione a opção "Add Managed Association".
<br>![Incident Add Managed Association](/assets/2.5.1.incident-add-managed-association.png)

Arraste o relacionamento até a entidade `Status`. Na janela de configuração do relacionamento, mantenha as opções já preenchidas.
<br>![Incident Status Managed Relationship](/assets/2.5.2.incident-status-managed-relationship.png)

Crie outra entidade chamada `Urgency` e repita os mesmos passos adotados para a entidade `Status`.

As entidades nesse momento devem apresentar a seguinte configuração:
<br>![Entities](/assets/2.5.3.entities.png)

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.6 Criando um serviço CDS simples

Deve haver uma API para que os usuários da aplicação possam manipular incidentes.

Nós criamos as entidades utilizando CDS. Agora criaremos os serviços que expõem uma entidade para consumo em uma API.

Feche a aba schema.cds e retorne para a visão de Storyboard. Na seção "Services" crie um novo serviço. Renomeie ele para ProcessorService.

Após a criação do serviço, selecione a opção "Open em Graphic Modeler".

Clique no botão "Add Entity" no canto superior direito e, na janela que se abre, escolha a entidade `incidents_mgt.Incidents` e salve a seleção.
<br>![Confirm Incident Service](/assets/2.6.1.confirm-incident-service.png)


[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.7 Executando a aplicação

Para executar a aplicação, iremos executar comandos no terminal, na pasta raiz da aplicação. Para abrir um terminal, pressione `F1`e digite *new terminal*.

No terminal, execute o comando:
`cds watch`

O console apresentará os logs de execução, indicando os arquivos carregados, o banco de dados que foi criado, a estratégia de autenticação configurada, e o caminho no qual o serviço CDS foi exposto. Por fim, o log apresenta em qual o url a aplicação poderá ser acessada localmente.
<br>![Log Terminal](/assets/2.7.1.log-terminal.png)

Para acessar a aplicação, seguro `ctrl` e clique na url indicada no log (na imagem, a utl http://localhost:4004).

Na página de índice, é possível observar todos os *endpoints* e as suas respectivas entidades.

Repare que o caminho da url é `/service/ProcessorService`. Isso ocorre porque na definição do serviço o caminho foi expressamente declarado pela annotation `@path`, como se pode observar nas propriedades do serviço.

Para consultar elas, no *Graphic Modeler* do serviço, navegue para a opção *Open Property Sheet* no canto superior direito.
<br>![Incidents Property Sheet](/assets/2.7.2.incidents-property-sheet.png)

Na aba annotations poderemos consultar a definição do `@path`:
<br>![Path Annotation](/assets/2.7.3.path-annotation.png)

A URL $metadata, por sua vez, fornece o documento metada necessário para adoção do protocolo [OData](https://cap.cloud.sap/docs/advanced/odata)

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.8 Adicionando dados de exemplo

Antes de incluir dados de exemplo nas tabelas, é necessária a criação dos arquivos csv em que vamos inserir esses dados.

No terminal, iremos executar o comando abaixo, na pasta raiz da aplicação. Se a aplicação ainda estiver executando no terminal em decorrência do passo anterior, é possível encerrar a execução apertando `ctrl + c` no teclado antes de executar o comando abaixo.

`cds add data`

Após a execução do comando, na visão do Storyboard, selecione o menu "Open Editor" no canto superior esquerdo e abra o editor "Sample Data".
<br>![Open Sample Data](/assets/2.8.1.open-sample-data.png)

Selecione a entidade Status e navegue para a guia Sample Data. No canto superior direito, defina que 3 linhas serão adicionadas e aperte o botão *Add*. Certifique-se de manter a opção *Mock Data* desabilitada. Note que foram inseridas 3 linhas em branco, que deverão ser preenchidas.
<br>![Add Initial Data](/assets/2.8.2.add-initial-data.png)

Preencha as linhas com os seguintes dados. O campo `descr` não é obrigatório e pode ser deixado em branco.

|code|name      |
|----|----------|
|N   |New       |
|I   |In Process|
|C   |Closed    |

O salvamento dos dados ocorrerá automaticamente, após os campos estarem preenchidos.

Repita os mesmos passos para preencher a *Sample Data* da entidade Urgency com os seguintes campos.

|code|name  |
|----|------|
|H   |High  |
|M   |Medium|
|L   |Low   |

Agora selecione a entidade *Incidents*. Na aba *Sample Data* vamos adicionar 10 linhas. Certifique-se de manter a opção *Mock Data* habilitada. Repare que ao adicionarmos as 10 linhas, a ferramenta também preenche as colunas Status e Urgency com as opções que inserimos nas respectivas entidades.

Adicione, também, 10 linhas à entidade *Conversations* com a opção *Mock Data* habilitada. Observe que a ferramenta preencheu automaticamente a chave estrangeira `incidents_ID`.

No terminal, , na pasta raiz da aplicação, execute novamente o comando `cds watch` e navegue para o serviço `Incidents`. Note que a chamada do serviço retornou as linhas que foram adicionadas.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.9 Adicionando uma UI simples

Na aplicação que se encontra em execução, no serviço `Incidents`, navegue para a opção *Fiori Preview*. Ela carregará uma tela Fiori seguindo um dos Floorplans do Fiori Elements.

Atualmente, a visualização não apresenta nenhum dado pois ainda precisa ser configurada.

No SAP BAS, navegue para a visualização de arquivos, no menu lateral esquerdo.
<br>![File Explorer](/assets/2.9.1.file-explorer.png)

Adicione um arquivo `app/annotations.cds` com este conteúdo:

```
using { ProcessorService as service } from '../srv/service';

// enable drafts for editing in the UI
annotate service.Incidents with @odata.draft.enabled;

// table columns in the list
annotate service.Incidents with @UI : {
  LineItem  : [
    { $Type : 'UI.DataField', Value : title},
    { $Type : 'UI.DataField', Value : modifiedAt },
    { $Type : 'UI.DataField', Value : status.name, Label: 'Status' },
    { $Type : 'UI.DataField', Value : urgency.name, Label: 'Urgency' },
  ],
};

// title in object page
annotate service.Incidents with @(
    UI.HeaderInfo : {
      Title : {
        $Type : 'UI.DataField',
        Value : title,
      },
      TypeName : 'Incident',
      TypeNamePlural : 'Incidents',
      TypeImageUrl : 'sap-icon://alert',
    }
);
```

Ao navegar novamente para o Fiori Preview, note que agora a visualização apresenta as colunas indicadas nas *Annotations*.

Por meio das annotations, o framework Fiori Elements interpreta como a tela deve ser renderizada e quais informações devem ser exibidas. As annotations podem ser disponibilizadas em qualquer CDS, e não somente nas localizadas dentro da pasta App.

Inclusive, é possível notar que a coluna `modifiedAt` possui um título pré-configurado. Isso ocorre porque o módulo `common.cds` possui uma *annotation*, na classe `managed`, que personaliza o título a ser exibido, utilizando a anotação `@title`.

Os textos atuais são obtidos de um pacote de recursos que é endereçado com uma chave `{i18n>...}`. Consulte o [guia de localização](https://cap.cloud.sap/docs/guides/i18n) para saber como isso funciona.

Para exemplificar esse recurso, vamos inserir uma annotation na CDS da entidade *Incidents*, atribuindo um título para ela.

Retorne à Visão Storyboard, selecione o Data Model criado, e selecione *Open in Graphical Modeler*. Selecione a entidade Incidents e navegue para a opção *Show Details*.

Na aba Annotations, no campo title. Adicione uma Annotation. No campo *term* adicione o valor `title` e no campo *value* adicione o valor `Title`.

Retorne à Fiori Preview e atualize a página. Repare que o título da coluna foi alterado, para refletir a annotation que foi incluída.
<br>![UI](/assets/2.9.2.ui-1.png)


[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.10 Adicionando regras de negócio

Agora, vamos adicionar uma regra de negócio para a aplicação. Vamos inserir uma funcionalidade em que, sempre que um incidente for criado com a palavra *urgent* no título, a sua urgência deve ser definida como "High".

No *File Explorer* crie o arquivo `srv/service.js` e adicione o seguinte código:

```
const LCAPApplicationService = require('@sap/low-code-event-handler');

class ProcessorService extends LCAPApplicationService {
    async init() {

        this.before('CREATE', 'Incidents', (request) => {
            const { data } = request;
            if (data) {
                const incidents = Array.isArray(data) ? data : [data]
                incidents.forEach(incident => {
                    if (incident.title?.toLowerCase().includes('urgent')) {
                        incident.urgency = { code: 'H' }
                    }
                })
            }
        });

        return super.init();
    }
}

module.exports = {
    ProcessorService
};
```

Observe como o arquivo `js` tem o mesmo nome do arquivo `cds`. É assim que a estrutura encontra a implementação. Você pode ver isso na saída de `cds watch`, em que nos logs aparece a definição `impl`.

```
...
[cds] - serving ProcessorService { path: '/odata/v4/processor', impl: 'srv/processor-service.js' }
...
```

Agora você pode testar o funcionamento da lógica. Por meio da interface gráfica, crie um incidente com a palavra *urgent* no nome. O status automaticamente será definido como High.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 2.11 Criando um serviço CDS mais complexo

Vamos criar um serviço CDS que explore mais o potencial que a ferramenta pode oferecer.

No serviço que criamos acima, usamos apenas a forma mínima de uma [projeção CDS](https://cap.cloud.sap/docs/cds/cdl#views-and-projections), que basicamente faz uma exposição de uma entidade à superfície da API.

No entanto, as projeções vão muito além disso e fornecem meios poderosos para expressar consultas para cenários de aplicação específicos.

Quando mapeadas para bancos de dados relacionais, tais projeções são de fato traduzidas para visualizações SQL.

Iremos criar um serviço que limita as informações expostas ao título do incidente e nome do status, além de expor um campo customizado que concatena dois outros campos e informa a quantidade de conversas vinculadas ao incidente, somente para os que tiverem Urgência Alta.

Na visão Storyboard, crie um novo serviço chamado StatisticsService e siga os mesmos passos da criação do serviço ProcessorService.

Após a criação do serviço, abra o *File Explorer* e altere a definição da projeção da entidade para a seguinte lógica:

```
service StatisticsService {

  entity StatisticsService as
        projection on my.Incidents {
            title, // expose as-is
            status.name as status, // expose with alias name using a path expression
            modifiedAt || ' (' || modifiedBy || ')' as modified: String,
            count(conversations.ID) as conversationCount : Integer
        }
        where urgency.code = 'H' // filter
        group by ID // needed for count()
}
```
Após, é possível consultar o serviço no app em execução, e podemos visualizar que os dados estão sendo filtrados.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

## 3. Integrando a aplicação com o SAP S/4 HANA

No próximo exercício, iremos incluir a entidade `Customers`, que representa os dados do cliente que criou o incidente.

Os dados do cliente estão disponíveis no SAP S/4HANA Cloud como parte do serviço `Business Partners`.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 3.1 Adicionando um pacote de integração

Para acelerar o desenvolvimento, utilizaremos um Pacote de Integração disponibilizado pela SAP.

Pacotes de Integração representam desenvolvimentos que aceleram a implementação de uma funcionalidade e, no caso da que utilizaremos, facilitam a integração da nossa aplicação com o serviço `Business Partners` no SAP S/4 HANA Cloud.

Existem pacotes disponibilizados pela SAP e por terceiros, e disponíveis em repositórios de pacotes na internet.

Para instalar o pacote na nossa aplicação, execute o seguinte comando no terminal, na pasta raiz da aplicação. Se a aplicação ainda estiver executando no terminal em decorrência do passo anterior, é possível encerrar a execução apertando ctrl + c no teclado antes de executar o comando abaixo:

`npm add git+https://github.com/caarloseduardo/btp-experience-extension-with-cap#bupa-integration-package`

Após a instalação, os arquivos estarão presentes na pasta `node_modules/s4-bupa-integration` e poderão ser consultados para que nós vejamos quais entidades e recursos estão disponíveis no pacote. Para consultá-los, basta acessar o *File Explorer* e navegar até a pasta.

Agora vamos importar os arquivos do Pacote de Integração.

Acesse o *File Explorer* e navegue até a pasta `db/schema.cds`. Abaixo da declaração do namespace, acrescente o seguinte código para disponibilizar o pacote no Data Model:

`using { API_BUSINESS_PARTNER as S4 } from 's4-bupa-integration/bupa';`

O arquivo deve se apresentar desse jeito:
<br>![Data Model Add Integration Package](/assets/3.1.1.data-model-add-integration-package.png)

Será necessário, também, cadastrar o pacote na configuração da aplicação. Para isso, adicione o código abaixo ao nível superior do `package.json`:

```
"cds": {
    "requires": {
        "API_BUSINESS_PARTNER": {
            "kind": "odata-v2",
            "model": "s4-bupa-integration/bupa"
        }
    }
}
```

O arquivo deve se apresentar desse jeito:
<br>![Package Json Add Integration Package](/assets/3.1.2.package-json-add-integration-package.png)

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 3.2 Adicionando entidades e serviços para integração com o SAP S/4 HANA

Vamos utilizar apenas dois campos da entidade `A_BusinessPartner`, que se encontra no SAP S/4 HANA e será projetada para a nossa aplicação.

Na visão de Storyboard, selecione o Data Model da nossa aplicação e navegue para a opção "Open in Graphical Modeler".

Dentro do editor gráfico, selecione a opção *Add Projection* apertando o botão "+" no canto superior direito.
<br>![Add Projection](/assets/3.2.1.add-projection.png)

Selecione a base `API_BUSINESS_PARTNER.A_BusinessPartner` e, nas propriedades disponíveis, selecione somente os campos `BusinessPartner` e `BusinessPartnerFullName`, renomeando o primeiro para `ID` e o segundo para `name`. Também altere o nome da entidade para `Customers`.
<br>![Business Partner Projection](/assets/3.2.2.business-partner-projection.png)

Vamos criar o relacionamento entre a entidade `Incidents` e a `Customers`. Selecione a entidade `Incidents` e, na aba *Relationships*, clique em *Add Managed Association*.
<br>![Incident Add Customer Relationship](/assets/3.2.3.incident-add-customers-relationship.png)

Selecione a entidade `Customers`, preencha o campo name com o valor `customer` e mantenha a opção *Key Property* em "No".

Por fim, volte à aba Storyboard, na seção *Services* selecione o serviço `ProcessorService` e navegue para a opção *Open in Graphical Modeler*. Na aba de edição do serviço clique em *Add Entity* no canto superior direito e adicione a entidade `Customers`.

Selecione a entidade `Customers` e navegue para a opção *Show details*. Na aba configurações, desabilite a opção *Draft Editing*.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 3.3 Testando com dados simulados

Execute no terminal o comando `cds watch`. É possível notar nos logs que os dados da entidade `API_BUSINESS_PARTNER` foram simulados, pois a conexão com o servidor remoto ainda não foi configurada e o Pacote de Integração provê a simulação desses dados.

O comando `cds watch` roda em 'modo simulado' por padrão. Em produção, isso não acontecerá, pois a aplicação é iniciada com `cds-serve`. Consulte a [documentação](https://cap.cloud.sap/docs/guides/extensibility/composition#testing-locally) para saber como o `cds watch` se vincula aos serviços.

Ao navegar para a aplicação, é possível observar que todas as entidades do serviço encontram-se disponíveis para teste e consulta.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 3.4 Delegando chamadas para o SAP S/4 HANA

Abra novamente o *File Editor* no menu esquerdo e abra o arquivo `srv/service.js`. Antes da instância da classe `ProcessorService` adicione a seguinte linha de código:
`const cds = require('@sap/cds')`

Dentro da função `init` da classe, após a manipulação do evento que criamos nos passos anteriores, adicione o seguinte código:
```
// connect to S4 backend
const S4bupa = await cds.connect.to('API_BUSINESS_PARTNER')

this.on('READ', 'Customers', async (request, next) => {
    console.log(`>> delegating '${request.target.name}' to S4 service...`, request.query)
    const result = await S4bupa.run(request.query)
    return result
});
```

O serviço deve se parecer da seguinte maneira:
<details>
    <summary>Código completo</summary>

```
const LCAPApplicationService = require('@sap/low-code-event-handler');

const cds = require('@sap/cds');

class ProcessorService extends LCAPApplicationService {
    async init() {

        this.before('CREATE', 'Incidents', (request) => {
            const { data } = request;
            if (data) {
                const incidents = Array.isArray(data) ? data : [data]
                incidents.forEach(incident => {
                    if (incident.title?.toLowerCase().includes('urgent')) {
                        incident.urgency = { code: 'H' }
                    }
                })
            }
        });

        // connect to S4 backend
        const S4bupa = await cds.connect.to('API_BUSINESS_PARTNER')

        this.on('READ', 'Customers', async (request, next) => {
            console.log(`>> delegating '${request.target.name}' to S4 service...`, request.query)
            const result = await S4bupa.run(request.query)
            return result
        });

        return super.init();
    }
}

module.exports = {
    ProcessorService
};
```

</details>


[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 3.5 Testando com dados vindo do SAP S/4 HANA

Para acessar dados do SAP S/4 HANA, utilizaremos o ambiente sandbox do SAP Business Accelerator Hub. 

Para acessá-lo, será necessária a obtenção de uma chave de API. Acesse o [SAP Business Accelerator Hub](https://api.sap.com/). No canto superior direito, expanda o menu suspenso do perfil e escolha a opção Configurações. O site pode exigir o login na conta SAP antes de disponibilizar essas opções. Na página de configurações, clique no botão *Show API Key* e copie sua chave de API.

Abra o *File Editor* e, na pasta raiz da aplicação, crie um arquivo `.env`. Insira nele as linhas abaixo, substituindo o texto \<Copied API Key\> pela chave obtida no SAP Business Accelerator Hub:
```
DEBUG=remote
cds.requires.API_BUSINESS_PARTNER.[sandbox].credentials.url=https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/
cds.requires.API_BUSINESS_PARTNER.[sandbox].credentials.headers.APIKey=<Copied API Key>
```

Observe o segmento "sandbox" que denota um [perfil de configuração](https://cap.cloud.sap/docs/node.js/cds-env#profiles) chamado `sandbox`. O nome não tem nenhum significado especial, e em seguida veremos como utiliza-lo.

Por fim, mate a execução da aplicação no terminal apertando `ctrl+c` e execute o comando novamente, mas indicando a utilização do perfil `sandbox`:
`cds watch --profile sandbox`

Nos logs da execução é possível observar que a aplicação conectou-se com o servidor remoto, e não com os dados simulados.

Na página de índice da aplicação, o serviço simulado desapareceu, porque não é mais servido na aplicação. Em vez disso, presume-se que ele esteja executando em um sistema remoto. Através da configuração acima, o sistema sabe como se conectar a ele.

Também é possível observar nos logs a seguintes saídas (devido à variável `DEBUG=remote` do arquivo `.env`):
```
...
[cds] - connect to API_BUSINESS_PARTNER > odata-v2 {
  url: 'https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/',
  headers: { APIKey: '...' }
}
...
```

Esta é a solicitação remota enviada pelo framework quando `S4bupa.run(req.query)` é executado. O objeto `req.query` é traduzido de forma transparente para uma consulta OData `$select=BusinessPartner,BusinessPartnerFullName&$top=...&$orderby=....` A solicitação HTTP inteira (concluída pela configuração do URL do sandbox) é então enviada ao sistema remoto com a ajuda do SAP Cloud SDK.

Observe como é simples a execução de consultas remotas. Nenhuma construção manual de consulta OData é necessária, nenhuma configuração de cliente HTTP como autenticação, nenhuma análise de resposta, tratamento de erros, nem problemas com nomes de host conectados, etc.

Consulte a [documentação sobre CQN](https://cap.cloud.sap/docs/cds/cqn) para obter mais informações sobre essas consultas em geral.

Os aplicativos CAP usam o [SAP Cloud SDK](https://sap.github.io/cloud-sdk/) para realizar a conexão HTTP. O SAP Cloud SDK abstrai fluxos de autenticação e comunicação com [connectivity, destination, and authentication](https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destinations) do SAP BTP. Não importa se você deseja se conectar à nuvem ou a sistemas locais.

Por fim, na aplicação, é possível navegar para a entidade `Customers` e observar os dados recepcionados do SAP S/4 HANA.


[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 3.6 Enriquecendo a UI

Agora vamos enriquecer a interface com funcionalidades mais próximas de um ambiente produtivo.

Na aba Storyboard, na seção UI Applications, iremos adicionar uma nova UI Application. Essa navegação nos levará a um Wizard que nos permitirá a criação de uma Interface Gráfica baseada no Fiori Elements.

Na primeira página, preencheremos os campos da seguinte mnaneira:
- Display name: Incidents
- Application name: incidents
- Description: Incidents list
- Data source: ProcessorService

Na segunda página, selecionaremos a opção Template-Based.

Na terceira página, selecionaremos a opção List Report Page

A última página será preenchida com os seguintes campos:
- Main entity: Incidents
- Navigation entity: conversations

Após a criação da aplicação, substituiremos o texto do arquivo `app/incidents_mgt.incidents/annotations.cds` com os seguintes valores:
<details>
<summary>Annotations</summary>

```
using { ProcessorService as service } from '../../srv/service';

// enable drafts for editing in the UI
annotate service.Incidents with @odata.draft.enabled;

// table columns in the list
annotate service.Incidents with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : title,
            Label : '{i18n>Title}',
        },
        {
            $Type : 'UI.DataField',
            Value : status.name,
            Criticality : status.name,
            Label : '{i18n>Status}',
        },
        {
            $Type : 'UI.DataField',
            Value : urgency.name,
            Criticality : urgency.name,
            Label : '{i18n>Urgency}',
        },
    ]
);
annotate service.Incidents with @(
    UI.FieldGroup #GeneralInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : title,
                Label : '{i18n>Title}',
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : '{i18n>Overview}',
            ID : 'i18nOverview',
            Facets : [
                {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : '{i18n>generalInformation}',
            Target : '@UI.FieldGroup#GeneralInformation',
        },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>Details}',
                    ID : 'i18nDetails',
                    Target : '@UI.FieldGroup#i18nDetails',
                },],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Conversations}',
            ID : 'i18nConversations',
            Target : 'conversations/@UI.LineItem#i18nConversations',
        },
    ]
);
annotate service.Incidents with @(
    UI.SelectionFields : [
        urgency_code,
        status_code,
    ]
);
annotate service.Incidents with {
    status @Common.Label : '{i18n>Status}'
};
annotate service.Incidents with {
    urgency @Common.Label : '{i18n>Urgency}'
};
annotate service.Incidents with {
    status @Common.ValueListWithFixedValues : true
};
annotate service.Incidents with {
    urgency @Common.ValueListWithFixedValues : true
};
annotate service.Incidents with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : title,
        },
        TypeName : '',
        TypeNamePlural : '',
        TypeImageUrl : 'sap-icon://alert',
    }
);
annotate service.Incidents with @(
    UI.FieldGroup #i18nDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : status_code,
                Criticality : status.code,
            },
            {
                $Type : 'UI.DataField',
                Value : urgency_code,
            },],
    }
);
annotate service.Status with {
    code @Common.Text : name
};
annotate service.Urgency with {
    code @Common.Text : name
};
annotate service.Incidents with {
    status  @Common.Text : status.name;
    urgency @Common.Text : urgency.name;
};

annotate service.Conversations with @(
    UI.LineItem #i18nConversations : [
        {
            $Type : 'UI.DataField',
            Value : author,
            Label : '{i18n>Author}',
        },{
            $Type : 'UI.DataField',
            Value : timestamp,
            Label : '{i18n>ConversationDate}',
        },{
            $Type : 'UI.DataField',
            Value : message,
            Label : '{i18n>Message}',
        },]
);

annotate service.Customers with @UI.Identification : [{ Value:name }];
annotate service.Customers with @cds.odata.valuelist;
annotate service.Customers with {
  ID   @title : 'Customer ID';
  name @title : 'Customer Name';
};

annotate service.Incidents with @(
  UI: {
    // insert table column
    LineItem : [
      ...up to { Value: title },
      { Value: customer.name, Label: 'Customer' },
      ...
    ],

    // insert customer to field group
    FieldGroup #GeneralInformation : {
      Data: [
        ...,
        { Value: customer_ID, Label: 'Customer'}
      ]
    },
  }
);

// for an incident's customer, show both name and ID
annotate service.Incidents:customer with @Common: {
  Text: customer.name,
  TextArrangement: #TextFirst
};
```

</details>

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 3.7 Testando com UI

Ao acessar a aplicação em execução, é possível notar que agora existe um link na seção *Web Applications* que navega para a interface que foi criada.

Para testar a aplicação, é possível criar um incidente e selecionar um `Customer`, já obtendo os dados vindos do SAP S/4 HANA.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

## 4. Lidando com Replicações e Eventos

Na lista de incidentes, a aplicação deve exibir dados do cliente (remotos) juntamente com dados de incidentes (locais da aplicação).

Isso levanta um problema de desempenho: ao mostrar potencialmente centenas de incidentes, o aplicativo deve chegar ao sistema remoto? Ou apenas para registros únicos, para todos os registros de uma vez ou para um conjunto de registros?

Neste exercício, vamos incluir a funcionalidade de replicar dados do sistema remoto para a nossa aplicação.

O cenário ficará assim:

- O usuário insere uma nova ocorrência e seleciona o cliente através da ajuda de valor. A ajuda do valor mostra apenas dados do cliente remote.
- Assim que o registro do incidente é criado, os dados do cliente são gravados em uma tabela de réplica local.
- Outras solicitações para o cliente do incidente são atendidas nesta tabela de réplica.
- Os registros replicados serão atualizados se um cliente remoto mudar.

Para isso, precisaremos tornar a entidade `Customer` persistente na nossa aplicação.

Na aba Storyboard, selecione o Dta Model e navegue para a opção *Open In Graphic Modeler*. Selecione a entidade `Customers` e na aba *Annotations* inclua a annotation `cds.persistence.table` na entidade. Consulte a [documentação](https://cap.cloud.sap/docs/cds/annotations#persistence) para saber mais sobre anotações que influenciam a persistência.
<br>![Customer Persistance Annotation](/assets/4.0.1.customers-persistance-annotation.png)

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 4.1 Replicando dados sob demanda

Para replicar os dados sob demanda, precisaremos realizar algumas alterações no nosso código.

Abra novamente o *File Editor* no menu esquerdo e abra o arquivo `srv/service.js`.

Dentro da função `init` da classe, após a manipulação do evento que criamos nos passos anteriores, adicione o seguinte código:
```
const db = await cds.connect.to('db')                // our primary database
const { Customers } = db.entities("incidents_mgt")  // CDS definition of the Customers entity

this.after(['CREATE', 'UPDATE'], 'Incidents', async (results, request) => {
    const { customer_ID: ID } = results;
    if (ID) {
        console.log('>> Updating customer', ID)
        const customer = await S4bupa.read(Customers, ID) // read from remote
        await UPSERT(customer).into(Customers)          // update cache
    }
});
```

O serviço deve se parecer da seguinte maneira:
<details>
    <summary>Código completo</summary>

```
const LCAPApplicationService = require('@sap/low-code-event-handler');

const cds = require('@sap/cds');

class ProcessorService extends LCAPApplicationService {
    async init() {

        this.before('CREATE', 'Incidents', (request) => {
            const { data } = request;
            if (data) {
                const incidents = Array.isArray(data) ? data : [data]
                incidents.forEach(incident => {
                    if (incident.title?.toLowerCase().includes('urgent')) {
                        incident.urgency = { code: 'H' }
                    }
                })
            }
        });

        // connect to S4 backend
        const S4bupa = await cds.connect.to('API_BUSINESS_PARTNER')

        this.on('READ', 'Customers', async (request, next) => {
            console.log(`>> delegating '${request.target.name}' to S4 service...`, request.query)
            const result = await S4bupa.run(request.query)
            return result
        });

        const db = await cds.connect.to('db')                // our primary database
        const { Customers } = db.entities("incidents_mgt")  // CDS definition of the Customers entity

        this.after(['CREATE', 'UPDATE'], 'Incidents', async (results, request) => {
            const { customer_ID: ID } = results;
            if (ID) {
                console.log('>> Updating customer', ID)
                const customer = await S4bupa.read(Customers, ID) // read from remote
                await UPSERT(customer).into(Customers)          // update cache
            }
        });

        return super.init();
    }
}

module.exports = {
    ProcessorService
};
```

</details>

Para testar, basta criar um `Ìncident` via UI e selecionar um `Customer`. Nos logs da aplicação, será possível observar a linha `>> Updating customer` confirmando que a replicação aconteceu.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 4.2 Testando replicação sob demanda sem UI

Com o [REST client for VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), você pode testar convenientemente o mesmo fluxo sem a UI.

Abra novamente o *File Editor* no menu esquerdo e crie o arquivo `srv/requests/tests.http`. Adicione nele o seguinte código:
```
###
# @name IncidentsCreate

POST http://localhost:4004/service/ProcessorService/Incidents
Content-Type: application/json

{
  "title": "New incident",
  "customer_ID": "1001039"
}

###
@id = {{IncidentsCreate.response.body.$.ID}}

POST http://localhost:4004/service/ProcessorService/Incidents(ID={{id}},IsActiveEntity=false)/draftActivate
Content-Type: application/json
```

Clique em `Send Request` acima da linha `POST .../Incidents`. Isso irá criar um novo registro como rascunho.

Clique em `Send Request` acima da linha ``POST .../draftActivate``. isso corresponde à ação de salvar na UI.

Esta segunda solicitação é necessária para todas as alterações em entidades gerenciadas pelo mecanismo [SAP Fiori Drafts](https://cap.cloud.sap/docs/advanced/fiori#draft-support).

Nos logs da aplicação, será possível observar a linha `>> Updating customer` confirmando que a replicação aconteceu.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 4.3 Replicação de dados baseada em evento

É possível também atualizar a tabela da nossa aplicação com base nas alterações que forem realizadas no servidor remoto.

O Pacote de Integração provê uma funcionalidade que disponibiliza essas definições de eventos.

Abra novamente o *File Editor* no menu esquerdo e abra o arquivo `node_modules/s4-bupa-integration/bupa/index.cds`. No aquivo será possível observar as seguintes definições:
```
event BusinessPartner.Created @(topic : 'sap.s4.beh.businesspartner.v1.BusinessPartner.Created.v1') {
  BusinessPartner : S4.A_BusinessPartner:BusinessPartner;
}
event BusinessPartner.Changed @(topic : 'sap.s4.beh.businesspartner.v1.BusinessPartner.Changed.v1') {
  BusinessPartner : S4.A_BusinessPartner:BusinessPartner;
}
```

Os benefícios dessas definições de eventos com modelos são:
- O [suporte do CAP para eventos e mensagens](https://cap.cloud.sap/docs/guides/messaging/) pode inscrever-se automaticamente para corretores de mensagens e emitir eventos nos bastidores.
- Além disso, nomes de eventos como `BusinessPartner.Changed` são semanticamente mais próximos do domínio e mais fáceis de ler do que os eventos técnicos subjacentes como `sap.s4.beh.businesspartner.v1.BusinessPartner.Changed.v1`.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 4.4 Reagindo a eventos

Para utilizar a funcionalidade, vamos alterar o nosso código para consumir eventos.

Abra novamente o *File Editor* no menu esquerdo e abra o arquivo `srv/service.js`.

Dentro da função `init` da classe, após a manipulação do evento que criamos nos passos anteriores, adicione o seguinte código:
```
// update cache if BusinessPartner has changed
S4bupa.on('BusinessPartner.Changed', async ({ event, data }) => {
    console.log('<< received', event, data)
    const { BusinessPartner: ID } = data
    const customer = await S4bupa.read(Customers, ID)
    await UPSERT.into(Customers).entries(customer)
})
```

O serviço deve se parecer da seguinte maneira:
<details>
    <summary>Código completo</summary>

```
const LCAPApplicationService = require('@sap/low-code-event-handler');

const cds = require('@sap/cds');

class ProcessorService extends LCAPApplicationService {
    async init() {

        this.before('CREATE', 'Incidents', (request) => {
            const { data } = request;
            if (data) {
                const incidents = Array.isArray(data) ? data : [data]
                incidents.forEach(incident => {
                    if (incident.title?.toLowerCase().includes('urgent')) {
                        incident.urgency = { code: 'H' }
                    }
                })
            }
        });

        // connect to S4 backend
        const S4bupa = await cds.connect.to('API_BUSINESS_PARTNER')

        this.on('READ', 'Customers', async (request, next) => {
            console.log(`>> delegating '${request.target.name}' to S4 service...`, request.query)
            const result = await S4bupa.run(request.query)
            return result
        });

        const db = await cds.connect.to('db')                // our primary database
        const { Customers } = db.entities("incidents_mgt")  // CDS definition of the Customers entity

        this.after(['CREATE', 'UPDATE'], 'Incidents', async (results, request) => {
            const { customer_ID: ID } = results;
            if (ID) {
                console.log('>> Updating customer', ID)
                const customer = await S4bupa.read(Customers, ID) // read from remote
                await UPSERT(customer).into(Customers)          // update cache
            }
        });

        // update cache if BusinessPartner has changed
        S4bupa.on('BusinessPartner.Changed', async ({ event, data }) => {
            console.log('<< received', event, data)
            const { BusinessPartner: ID } = data
            const customer = await S4bupa.read(Customers, ID)
            await UPSERT.into(Customers).entries(customer)
        })

        return super.init();
    }
}


module.exports = {
    ProcessorService
};
```

</details>

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 4.5 Emitindo eventos do servidor simulado

Mas quem é o emissor do evento? Geralmente é a fonte de dados remota, ou seja, o sistema SAP S4/HANA.

Para execuções locais, seria ótimo se algo pudesse emitir eventos durante o teste. Felizmente, já existe um emissor de eventos simples no pacote de integração! Ele usa a [API `emit`](https://cap.cloud.sap/docs/node.js/core-services#srv-emit-event) para enviar um evento.

Abra novamente o *File Editor* no menu esquerdo e abra o arquivo `node_modules/s4-bupa-integration/bupa/index.cds`. No aquivo será possível observar o seguinte código:
```
 ...
  this.after('UPDATE', A_BusinessPartner, async data => {
    const event = { BusinessPartner: data.BusinessPartner }
    console.log('>> BusinessPartner.Changed', event)
    await this.emit('BusinessPartner.Changed', event);
  })
  this.after('CREATE', A_BusinessPartner, ...)
```

Isso significa que sempre que você altera ou cria dados por meio do serviço simulado `API_BUSINESS_PARTNER`, um evento local é emitido.

Observe também como o nome do evento `BusinessPartner.Changed` corresponde à definição do evento do código CDS acima.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>

---

### 4.6 Juntando tudo

Antes de iniciar o aplicativo novamente, é hora de transformar o banco de dados atual na memória em um banco de dados persistente. Dessa forma, os dados não são redefinidos após cada reinicialização, o que é útil se você adicionou dados manualmente.

Mate a execução `cds watch` no terminal e execute:
`cds deploy --with-mocks --to sqlite`

Isso implanta o equivalente SQL atual do seu modelo CDS em um banco de dados persistente. Isso também significa que após alterações no *Data Model* (novos campos, entidades etc.), você precisa executar o comando `cds deploy ...` novamente. Tenha isso em mente caso você veja erros como *table/view not found*.

Inicie a aplicação com a parametrização de que será utilizado um banco de dados SQLite (que neste caso significa um banco de dados persistente):
`CDS_REQUIRES_DB=sqlite cds watch`

`CDS_REQUIRES_DB=sqlite` tem o mesmo efeito que `"cds": { "requires": { db:"sqlite" } }` no arquivo *package.json*, só que o último é uma configuração permanente.

O aplicativo é executado como antes. No log, entretanto, você não vê mais uma implantação de banco de dados, mas uma linha como:

```
...
[cds] - connect to db > sqlite { url: 'db.sqlite' }
...
```

Abra novamente o *File Editor* no menu esquerdo e abra o arquivo `srv/requests/tests.http`, e adicione o seguinte código:
```
###
PUT http://localhost:4004/odata/v4/api-business-partner/A_BusinessPartner/1001039
Authorization: Basic carol:
Content-Type: application/json

{
  "BusinessPartnerFullName": "Cathrine Cloudy"
}
```
Execute novamente as chamadas que incluímos nos passos anteriores e, após execute a chamada que acabamos de incluir.

Após clicar em `Send Request` acima da linha `PUT ...`, você poderá ver nos logs tanto o evento sendo emitido quanto recebido:

```
>> BusinessPartner.Changed { BusinessPartner: 'Z100001' }
<< received BusinessPartner.Changed { BusinessPartner: 'Z100001' }
```

A UI do SAP Fiori também deverá refletir os dados alterados na tabela `Incidents`.

[Voltar para o Início](#build-extensions-with-sap-cloud-application-programming-model-cap)
<br>
<br>