// Detalhes de um livro
// Exibir informações completas do livro.
// Incluir botões: Editar e Excluir.
// Usar LivroPreview (componente de visualização).

export default function LivroDetalhesPage() {
    return <div>Livro Detalhes Page</div>;
}

// <DialogContent className="w-full max-h-[90vh] overflow-y-auto rounded-2xl py-12 no-scrollbar">
//     <DialogHeader className="flex flex-col md:flex-row md:items-start md: justify-between gap-4">

//         <div className="w-full md:w-48 flex-shrink-0 rounded-md">
//             <AspectRatio ratio={3 / 4} className="relative">
//                 <Image
//                     src={livro.cover || "/covers/placeholder.png"}
//                     alt={`Capa do livro ${livro.title}`}
//                     fill
//                     className="object-cover rounded-md"
//                 />
//             </AspectRatio>
//         </div>

//         <div className="flex-1">
//             <DialogTitle className="text-xl mb-1">
//                 {livro.title}
//             </DialogTitle>
//             <p className="text-lg text-muted-foreground mb-2">{livro.author}</p>
//             {livro.status && (
//                 <Badge className={statusConfig[livro.status]?.className}>
//                     {statusConfig[livro.status]?.label}
//                 </Badge>
//             )}
//         </div>

//     </DialogHeader>

//     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
//         <p className="text-muted-foreground">Páginas: {livro.pages}</p>
//         <p className="text-muted-foreground">Publicado em: {livro.year !== undefined ? livro.year : "Não informado"}</p>
//     </div>

//     <div className="container flex-wrap">
//         <p className="text-muted-foreground mb-2">Gêneros:</p>
//         <div className="flex flex-wrap gap-2">
//             {livro.genre?.map((g) => (
//                 <Badge key={g} variant={"outline"}>
//                     {g}
//                 </Badge>
//             ))}
//         </div>
//     </div>

//     <div className="flex items-center gap-1">
//         <Star width={18} height={18} fill="oklch(79.5% 0.184 86.047)" stroke="none" />
//         <span className="font-bold">{livro.rating}</span>
//         <span className="text-sm text-gray-500">(127.543 avaliações)</span>
//     </div>

//     <div>
//         <p className="font-medium mb-2">Descrição</p>
//         <p className="text-sm text-justify text-muted-foreground leading-relaxed">{livro.synopsis}</p>
//     </div>

//     {livro.status === StatusLeitura.LENDO && (<div>
//         <div className="flex items-center justify-between">
//             <p className="font-medium">Progresso de Leitura</p>
//             <Button variant={"ghost"} size={"sm"} className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 rounded-md p-1">
//                 <PenBoxIcon className="h-4 w-4" />
//                 Editar
//             </Button>
//         </div>

//     </div>)}

//     {/* Progresso de leitura */}

//     {showProgressBar && <div>
//         <div className="flex items-center justify-between text-sm mb-2">

//             <span className="flex items-center gap-1">
//                 <BookOpen className="w-4 h-4" />
//                 Página {livro.qtdPagesRead} de {livro.pages}
//             </span>

//             <span className="text-sm text-left text-gray-600 mt-1">
//                 {progress}
//                 %
//             </span>
//         </div>

//         <Progress value={parseInt(progress)} className="[&>div]:bg-purple-600" />

//     </div>}

//     {/* Avaliação e Resenha */}
//     <div className="space-y-2">
//         <p className="font-medium">Sua avaliação e Resenha</p>
//         <p className="text-sm text-muted-foreground">Sem Avaliações ainda</p>
//         <p className="text-sm text-muted-foreground">Sem Reviews ainda</p>
//     </div>

//     {/* Data de inicio */}
//     <div className="flex items-center gap-2">
//         <span className="flex items-center gap-1 text-muted-foreground">
//             <Calendar className="w-4 h-4 text-muted-foreground" /> Comecei em:
//         </span>
//         <span className="">4 de dezembro de 2024</span>
//     </div>

// </DialogContent>

//             </Dialog >


// {/* <Button
//               variant="outline"
//               size="sm"
//               className="hover:bg-red-500 hover:text-white cursor-pointer"
//             >
//               <Trash2 className="h-6 w-6" />
//             </Button> */}