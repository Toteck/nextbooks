import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { CheckCircle } from "lucide-react"


export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p>Acompanhe sua jornada de leitura!</p>
      </div>
      {/* grid dos cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row text-sm font-medium gap-2">
              Livros Lidos
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{/* usar o método stats.LivrosLidos */}</div>
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex text-sm font-medium">
              Lendo Atualmente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{/* usar o método stats.LendoAtualmente */}</div>
            <p className="text-xs text-muted-foreground">Continue assim</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quero Ler!</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{/* usar o método stats.QueroLer */}</div>
            <p className="text-xs text-muted-foreground">
              Sua lista de leitura
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Páginas Lidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div>{/* usar o método stats.paginasLidas */}</div>
            <p className="text-xs text-muted-foreground">
              Total de páginas lidas
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div>
          <Card></Card>
        </div>
        <div>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};
