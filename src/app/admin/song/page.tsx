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

interface Song  {
    id: number;
    title: string;
    length: string;
    ratings: string;
    updatedAt: string;
    albumId: number;
    albumName?: string;
};

interface Album {
    id: number;
    name: string;
}

const SongPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<Song[]>([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setLoading(true);
            const [songRes, albumRes] = await Promise.all([
                fetch('/api/song/'),
                fetch('/api/album/')
            ]);
            const songJson = await songRes.json();
            const albumJson = await albumRes.json();

            console.log("songs data:", songJson);
            console.log("albums data:", albumJson);

            const albumMap = new Map<number, string>();
            albumJson.data.forEach((album: Album) => {
                albumMap.set(album.id, album.name);
            });

            const sortedData = songJson.data
                .map((song: Song) => ({
                    ...song,
                    albumName: albumMap.get(song.albumId)
                }))
                .sort((a: Song, b: Song) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
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
                    const response = await fetch('/api/song?id=' + index, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        await getData();
                        Swal.fire(
                            'Deleted!',
                            'Song has been deleted.',
                            'success'
                        );
                        setLoading(false);
                    } else {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the song. Please try again later.',
                            'error'
                        );
                        setLoading(false);
                        throw new Error('Failed to delete album');
                    }
                } catch (error) {
                    console.error("Error deleting data:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the song. Please try again later.',
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
        router.push(`/admin/song/add-song?id=${index}`);
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
                title="Songs"
                topRightButtonText="New"
                headings={{ 
                    Title: "title",
                    Album: "albumName",
                    Length: "length",
                    Ratings: "ratings",
                }}
                actionsText={[<FaEdit key="edit" />, <ImBin key="delete" />]}
                onClickAction1={(id) => handleEdit(id)}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/song/add-song")}
            />
        </Header>
    );
};

export default SongPage;
