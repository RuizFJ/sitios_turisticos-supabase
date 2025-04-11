import type AddCategoria from "~/interfaces/addCategoria.interface";
import type Categoria from "~/interfaces/categoria.interface";

export function useCategorias() {
    const client:any = useSupabaseClient();

    const {data,error} = useAsyncData<Categoria[] | null>(
        "categoria",
        async () => {
            const { data, error } = await client.from("categoria").select(`
                id,
                nombre
                
            `).eq("active", true);
            if (error) {
                console.error("Error al obtener las categorias:", error);
                return null;
            }
            return data || null;
        }

    );

    const registrarCategoria = async (categoria: AddCategoria) => {
        const { data, error } = await client
            .from("categoria")
            .insert([
                {
                    nombre: categoria.nombre,
                },
            ]);
        if (error) {
            alert("Error al registrar la categoria");
            console.error("Error al registrar la categoria:", error);
            return null;
        }
        return error;

    }

    const eliminarCategoria = async (id: number) => {
        const { error } = await client
            .from("categoria")
            .delete()
            .eq("id", id);
        if (error) {
            alert("Error al eliminar la categoria");
            console.error("Error al eliminar la categoria:", error);
            return null;
        }
        return error;
    };

    const obtenerCategoriaById = async (id: number) => {
        const { data, error } = await client
            .from("categoria")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            alert("Error al obtener la categoria");
            console.error("Error al obtener la categoria:", error);
            return null;
        }
        return data;
    };
    return {data,error,registrarCategoria, eliminarCategoria, obtenerCategoriaById};

}