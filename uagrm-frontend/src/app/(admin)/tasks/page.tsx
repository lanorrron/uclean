import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReports } from "@/modules/report/hooks/useReports.hook";
import MyTasks from "@/modules/tasks/components/MyTasks";
import PublicTasks from "@/modules/tasks/components/PublicTasks";

const Task = () => {

    return (
        <Tabs defaultValue="public" >
            <TabsList>
                <TabsTrigger value="public">Lista de tareas</TabsTrigger>
                <TabsTrigger value="private">Assignados</TabsTrigger>
            </TabsList>
            <TabsContent value="public"><PublicTasks></PublicTasks></TabsContent>
            <TabsContent value="private"><MyTasks></MyTasks></TabsContent>
        </Tabs>
    )
}

export default Task;