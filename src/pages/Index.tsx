import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  project: string;
}

interface Project {
  id: number;
  name: string;
  progress: number;
  tasks: number;
  deadline: string;
  status: 'active' | 'planning' | 'completed';
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tasksCompleted: number;
  status: 'online' | 'offline';
}

const Index = () => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');

  const tasks: Task[] = [
    { id: 1, title: 'Реализация API авторизации', status: 'in-progress', priority: 'high', assignee: 'АИ', project: 'Backend Platform' },
    { id: 2, title: 'Оптимизация базы данных', status: 'review', priority: 'high', assignee: 'МС', project: 'Backend Platform' },
    { id: 3, title: 'Дизайн новой админ-панели', status: 'in-progress', priority: 'medium', assignee: 'ЕК', project: 'Admin Dashboard' },
    { id: 4, title: 'Настройка CI/CD pipeline', status: 'todo', priority: 'medium', assignee: 'ДП', project: 'DevOps' },
    { id: 5, title: 'Тестирование мобильной версии', status: 'done', priority: 'low', assignee: 'НВ', project: 'Mobile App' },
    { id: 6, title: 'Интеграция с платёжной системой', status: 'todo', priority: 'high', assignee: 'АИ', project: 'Backend Platform' },
  ];

  const projects: Project[] = [
    { id: 1, name: 'Backend Platform', progress: 65, tasks: 12, deadline: '15 дек', status: 'active' },
    { id: 2, name: 'Admin Dashboard', progress: 40, tasks: 8, deadline: '20 дек', status: 'active' },
    { id: 3, name: 'Mobile App', progress: 85, tasks: 15, deadline: '10 дек', status: 'active' },
    { id: 4, name: 'DevOps Infrastructure', progress: 30, tasks: 6, deadline: '25 дек', status: 'planning' },
  ];

  const team: TeamMember[] = [
    { id: 1, name: 'Алексей Иванов', role: 'Senior Backend Developer', avatar: '', tasksCompleted: 24, status: 'online' },
    { id: 2, name: 'Мария Смирнова', role: 'Database Specialist', avatar: '', tasksCompleted: 18, status: 'online' },
    { id: 3, name: 'Елена Козлова', role: 'UI/UX Designer', avatar: '', tasksCompleted: 31, status: 'offline' },
    { id: 4, name: 'Дмитрий Петров', role: 'DevOps Engineer', avatar: '', tasksCompleted: 15, status: 'online' },
    { id: 5, name: 'Наталья Волкова', role: 'QA Engineer', avatar: '', tasksCompleted: 22, status: 'online' },
  ];

  const filteredTasks = selectedStatus === 'all' ? tasks : tasks.filter(t => t.status === selectedStatus);

  const getStatusBadge = (status: TaskStatus) => {
    const variants = {
      'todo': { variant: 'secondary' as const, label: 'К выполнению' },
      'in-progress': { variant: 'default' as const, label: 'В работе' },
      'review': { variant: 'outline' as const, label: 'На ревью' },
      'done': { variant: 'secondary' as const, label: 'Готово' },
    };
    return variants[status];
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-green-500';
  };

  const stats = [
    { label: 'Активные задачи', value: tasks.filter(t => t.status === 'in-progress').length, icon: 'Zap', color: 'text-primary' },
    { label: 'Проекты в работе', value: projects.filter(p => p.status === 'active').length, icon: 'FolderKanban', color: 'text-secondary' },
    { label: 'Задачи на ревью', value: tasks.filter(t => t.status === 'review').length, icon: 'GitPullRequest', color: 'text-yellow-500' },
    { label: 'Готово за неделю', value: tasks.filter(t => t.status === 'done').length, icon: 'CheckCircle2', color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-10 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-gradient mb-2">Технологический отдел</h1>
              <p className="text-muted-foreground text-lg">Центр управления проектами и задачами</p>
            </div>
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Icon name="Plus" className="mr-2 h-5 w-5" />
              Новая задача
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <Card key={idx} className="glass-card hover:scale-105 transition-transform duration-300 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 ${stat.color}`}>
                      <Icon name={stat.icon as any} className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </header>

        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ListChecks" className="mr-2 h-4 w-4" />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="FolderKanban" className="mr-2 h-4 w-4" />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Команда
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {['all', 'todo', 'in-progress', 'review', 'done'].map(status => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(status as any)}
                  className="capitalize"
                >
                  {status === 'all' ? 'Все' : getStatusBadge(status as TaskStatus).label}
                </Button>
              ))}
            </div>

            <div className="grid gap-4">
              {filteredTasks.map((task, idx) => (
                <Card key={task.id} className="glass-card hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{task.title}</h3>
                          <Badge {...getStatusBadge(task.status)}>{getStatusBadge(task.status).label}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="FolderOpen" className="h-4 w-4" />
                            {task.project}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Flag" className={`h-4 w-4 ${getPriorityColor(task.priority)}`} />
                            {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-primary/20">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xs">
                            {task.assignee}
                          </AvatarFallback>
                        </Avatar>
                        <Button variant="ghost" size="icon">
                          <Icon name="MoreVertical" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project, idx) => (
                <Card key={project.id} className="glass-card hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${idx * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Icon name="Calendar" className="h-4 w-4" />
                          Дедлайн: {project.deadline}
                        </CardDescription>
                      </div>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status === 'active' ? 'Активен' : project.status === 'planning' ? 'Планирование' : 'Завершён'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm pt-2">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="ListTodo" className="h-4 w-4" />
                          {project.tasks} задач
                        </span>
                        <Button variant="ghost" size="sm">
                          Подробнее
                          <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member, idx) => (
                <Card key={member.id} className="glass-card hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${idx * 80}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-lg font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Завершено задач</span>
                        <span className="font-semibold text-primary">{member.tasksCompleted}</span>
                      </div>
                      <Badge variant="outline" className="w-full justify-center">
                        {member.status === 'online' ? '🟢 Онлайн' : '⚫ Офлайн'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
