import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Edit, Globe, CheckCircle, AlertCircle } from 'lucide-react';

// Mock translation data
const mockTranslations = [
  {
    key: 'nav.home',
    en: 'Home',
    ru: 'Главная',
    uk: 'Головна',
    status: 'complete',
  },
  {
    key: 'nav.shop',
    en: 'Shop',
    ru: 'Магазин',
    uk: 'Магазин',
    status: 'complete',
  },
  {
    key: 'nav.about',
    en: 'About',
    ru: 'О нас',
    uk: 'Про нас',
    status: 'complete',
  },
  {
    key: 'nav.blog',
    en: 'Blog',
    ru: 'Блог',
    uk: 'Блог',
    status: 'complete',
  },
  {
    key: 'nav.contact',
    en: 'Contact',
    ru: 'Контакты',
    uk: 'Контакти',
    status: 'complete',
  },
  {
    key: 'product.categories.singing_bowls',
    en: 'Singing Bowls',
    ru: 'Поющие Чаши',
    uk: 'Співаючі Чаші',
    status: 'complete',
  },
  {
    key: 'product.categories.meditation_bells',
    en: 'Meditation Bells',
    ru: 'Медитативные Колокольчики',
    uk: 'Медитативні Дзвіночки',
    status: 'complete',
  },
  {
    key: 'common.search',
    en: 'Search',
    ru: 'Поиск',
    uk: 'Пошук',
    status: 'complete',
  },
  {
    key: 'common.loading',
    en: 'Loading...',
    ru: 'Загрузка...',
    uk: 'Завантаження...',
    status: 'incomplete',
  },
];

const getStatusBadge = (status: string) => {
  if (status === 'complete') {
    return <Badge variant="default" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Complete</Badge>;
  } else {
    return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Incomplete</Badge>;
  }
};

export default function AdminLocalization() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Localization</h1>
          <p className="text-gray-600">Manage translations and multilingual content</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Globe className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Add Translation
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTranslations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTranslations.filter(t => t.status === 'complete').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incomplete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTranslations.filter(t => t.status === 'incomplete').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* Language Tabs */}
      <div className="flex space-x-1 border-b">
        <Button variant="ghost" className="border-b-2 border-blue-500">
          All Languages
        </Button>
        <Button variant="ghost">
          English
        </Button>
        <Button variant="ghost">
          Russian
        </Button>
        <Button variant="ghost">
          Ukrainian
        </Button>
      </div>

      {/* Translations Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Translation Keys</CardTitle>
              <CardDescription>Manage all translation keys and their values</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search translations..."
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Translation Key</TableHead>
                <TableHead>English</TableHead>
                <TableHead>Russian</TableHead>
                <TableHead>Ukrainian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTranslations.map((translation) => (
                <TableRow key={translation.key}>
                  <TableCell>
                    <div className="font-mono text-sm">{translation.key}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{translation.en}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{translation.ru}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{translation.uk}</div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(translation.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Translations
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Globe className="mr-2 h-4 w-4" />
                          View Usage
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete Key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
