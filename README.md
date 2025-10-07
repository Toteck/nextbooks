 📚 **NextBooks**

> Aplicação web moderna para gerenciamento de bibliotecas pessoais, desenvolvida com foco em organização, praticidade e experiência do usuário.

---

## 🧩 **Descrição Geral do Projeto**

O **NextBooks** é uma aplicação web voltada ao gerenciamento de bibliotecas pessoais.  
Permite que o usuário adicione, edite e acompanhe seus livros, classificando-os por gênero e status de leitura.  
O sistema foi desenvolvido com **tecnologias modernas**, garantindo uma interface intuitiva, alto desempenho e arquitetura escalável.  

O principal objetivo é oferecer uma ferramenta que una **simplicidade, eficiência e design responsivo**, permitindo ao usuário organizar suas leituras de forma prática e agradável.

---

## 🚀 **Tecnologias Utilizadas**

| Categoria | Tecnologias |
|------------|--------------|
| **Linguagens** | JavaScript, TypeScript |
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS, shadcn/ui |
| **Banco de Dados** | PostgreSQL + Prisma ORM |
| **Validação de Dados** | Zod |
| **Ícones** | Lucide React |
| **Testes de API** | Insomnia |
| **Controle de Versão** | Git e GitHub |
| **Ambiente de Desenvolvimento** | Visual Studio Code |
| **Design e Prototipação** | Figma |

---

## 🏗️ **Arquitetura e Estrutura do Sistema**

O projeto foi construído com base no **framework Next.js 15**, utilizando o **App Router** para gerenciar rotas e componentes de forma modular.  
A integração com o **Prisma ORM** garante uma camada de persistência segura e performática no **PostgreSQL**.  

Abaixo, uma visão simplificada da estrutura do projeto:

```
src/
 ├─ app/
 │   ├─ api/
 │   │   ├─ books/
 │   │   ├─ genres/
 │   │   └─ status/
 │   ├─ components/
 │   ├─ pages/
 │   └─ styles/
 ├─ prisma/
 │   └─ schema.prisma
 ├─ public/
 └─ README.md
```

---

## 🌐 **Rotas da API**

A API foi desenvolvida dentro do próprio ambiente do **Next.js**, aproveitando seus recursos nativos de rotas e middlewares.  
Cada rota foi estruturada para oferecer clareza, segurança e fácil manutenção.

### 📘 `/api/books`

| Método | Descrição |
|--------|------------|
| **GET** | Retorna todos os livros cadastrados |
| **POST** | Cria um novo livro |
| **PUT** | Atualiza as informações de um livro existente |
| **DELETE** | Remove um livro do sistema |

### 🏷️ `/api/genres`

| Método | Descrição |
|--------|------------|
| **GET** | Retorna todos os gêneros cadastrados |
| **POST** | Cadastra um novo gênero literário |

### 📊 `/api/status`

| Método | Descrição |
|--------|------------|
| **GET** | Lista os status de leitura disponíveis (lendo, concluído, desejado, etc.) |

---

## 🔍 **Exemplo de Documentação da API**

### ➤ **GET /api/books**

**Parâmetros**

| Parâmetro | Tipo | Obrigatório | Descrição |
|------------|------|--------------|------------|
| `api_key` | string | ✅ | Chave de autenticação da API |

**Exemplo de Resposta**
```json
[
  {
    "id": "1",
    "title": "Dom Casmurro",
    "author": "Machado de Assis",
    "genre": "Romance",
    "status": "Concluído"
  }
]
```

---

## 🧠 **Validações e Boas Práticas**

O **Zod** foi utilizado para validar todos os dados recebidos e enviados pela API, garantindo integridade e segurança nas operações.  
O projeto segue princípios de **Clean Code**, **responsividade** e **componentização reutilizável**, mantendo o código limpo, seguro e de fácil manutenção.

---

## 👩‍💻 **Ambiente de Desenvolvimento**

- Editor principal: **Visual Studio Code**  
- Versionamento de código: **Git + GitHub**  
- Testes de API: **Insomnia**  
- Prototipação e design de interface: **Figma**

---

## 🖋️ **Autores**

| Integrante | Função |
|-------------|--------|
| **Mateus** | Desenvolvimento Backend |
| **Fernanda** | Design e Frontend |
| **Stephan** | Desenvolvimento Frontend |
| **Sophia** | Documentação técnica do projeto |

---

## 📄 **Licença**

Este projeto foi desenvolvido para fins **acadêmicos** e **educacionais**.  
Todos os direitos reservados aos autores do grupo.

---

## 🏁 **Conclusão**

O **NextBooks** representa uma aplicação prática e moderna, que demonstra o domínio das tecnologias mais recentes do ecossistema JavaScript.  
Seu desenvolvimento integra conceitos de **engenharia de software**, **arquitetura de sistemas**, **design responsivo** e **boas práticas de programação**, resultando em uma solução eficiente e escalável para o gerenciamento de bibliotecas pessoais.
