"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";

interface Album  {
    id: number;
    name: string;
    track_no: string;
    price: string;
    updatedAt: string;
    genreId: number;
    genreName?: string;
};

interface Genre {
    id: number;
    name: string;
}


const AlbumPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<Album[]>([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setLoading(true);
            const [albumRes, genreRes] = await Promise.all([
                fetch('/api/album/'),
                fetch('/api/genre/')
            ]);

            const albumJson = await albumRes.json();
            const genreJson = await genreRes.json();

            console.log("albums data:", albumJson);
            console.log("genres data:", genreJson);

            const genreMap = new Map<number, string>();
            genreJson.data.forEach((genre: Genre) => {
                genreMap.set(genre.id, genre.name);
            });

            const sortedData = albumJson.data
                .map((album: Album) => ({
                    ...album,
                    genreName: genreMap.get(album.genreId)
                }))
                .sort((a: Album, b: Album) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            setTableData(sortedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const index = tableData[id].id;
                    const response = await fetch('/api/album?id=' + index, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        await getData();
                        Swal.fire(
                            'Deleted!',
                            'Album has been deleted.',
                            'success'
                        );
                        setLoading(false);
                    } else {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the album. Please try again later.',
                            'error'
                        );
                        setLoading(false);
                        throw new Error('Failed to delete album');
                    }
                } catch (error) {
                    console.error("Error deleting data:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the album. Please try again later.',
                        'error'
                    );
                    setLoading(false);
                }
            }
        });
    };

    const handleEdit = (id: number) => {
        const index = tableData[id].id;
        console.log(index, "clicked id is");
        router.push(`/admin/album/add-album?id=${index}`);
    };

    return (
        <Header>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
                    <ProgressSpinner />
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )}
            <TableLayout
                data={tableData}
                title="Albums"
                topRightButtonText="New"
                headings={{ 
                    Title: "name",
                    Genre: "genreName",
                    Track_No: "track_no",
                    Price: "price", 
                }}
                actionsText={[<FaEdit key="edit" />, <ImBin key="delete" />]}
                onClickAction1={(id) => handleEdit(id)}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/album/add-album")}
            />
        </Header>
    );
};

export default AlbumPage;
