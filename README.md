<div align="center">
  <img src="public/images/logo-verdea.png" alt="Verdea Logo" width="200"/>
  <h1>Verdea - Sistema de Irrigação Inteligente</h1>
</div>

## 📖 Sobre

Verdea é uma plataforma completa para monitoramento e automação de irrigação. Com ela, usuários podem cuidar de suas plantas de forma eficiente e remota, garantindo que recebam a quantidade de água ideal, economizando recursos e otimizando o crescimento.

---

## 📸 Telas do Sistema

Abaixo estão algumas das principais telas da aplicação.

### Landing Page
<img width="1425" height="743" alt="image" src="https://github.com/user-attachments/assets/31909277-6924-445f-aeb0-18ffcac27e3a" />

### Dashboard do Usuário
<img width="1425" height="739" alt="image" src="https://github.com/user-attachments/assets/f14ba7cf-e7d9-4463-95c6-d7483ff419fb" />

### Gerenciamento de Dispositivos
<img width="1439" height="732" alt="image" src="https://github.com/user-attachments/assets/0797d224-2180-4fb4-94c4-930357e00f5c" />

### Gerenciamento de Plantas
<img width="1439" height="734" alt="image" src="https://github.com/user-attachments/assets/50d2a0cf-9285-4b4b-a002-425b1c65397c" />

### Histórico de Irrigação
<img width="1439" height="734" alt="image" src="https://github.com/user-attachments/assets/1e375375-3df1-4779-8fba-5a595c5a2b97" />

---

## ✨ Funcionalidades Principais

-   **Autenticação de Usuários:** Sistema seguro de login e cadastro.
-   **Dashboard Interativo:** Visualize estatísticas de umidade, temperatura e irrigações recentes.
-   **Gerenciamento de Dispositivos:** Adicione, configure e monitore seus dispositivos ESP32.
-   **Controle de Plantas:** Cadastre suas plantas e associe-as a dispositivos específicos.
-   **Histórico Detalhado:** Acompanhe todo o histórico de irrigações realizadas.
-   **Painel Administrativo:** Gerencie usuários, dispositivos e plantas de toda a plataforma.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

-   **Frontend:**
    -   [Next.js](https://nextjs.org/) (com App Router)
    -   [React](https://react.dev/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [Shadcn/UI](https://ui.shadcn.com/) - Componentes de UI
    -   [Tanstack Query](https://tanstack.com/query) - Gerenciamento de estado de servidor
    -   [Recharts](https://recharts.org/) - Gráficos
-   **Qualidade de Código:**
    -   [ESLint](https://eslint.org/)
-   **Deploy:**
    -   [Vercel](https://vercel.com/)

---

## 🚀 Como Começar

Siga os passos abaixo para executar o projeto em seu ambiente local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/en) (versão 20.x ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Backend (API):**
    Para o funcionamento completo do projeto, é necessário configurar o backend. Visite o repositório da API em [https://github.com/LucasVitorVD/api-verdea](https://github.com/LucasVitorVD/api-verdea) e siga a documentação para configurá-lo.

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env.local` na raiz do projeto e adicione as variáveis necessárias. Use o arquivo `.env.example` (se existir) como referência.

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env.local` na raiz do projeto e adicione as variáveis necessárias. Use o arquivo `.env.example` (se existir) como referência.
    ```env
    # Exemplo
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
