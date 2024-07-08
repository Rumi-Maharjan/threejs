"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoChevronBackOutline, IoChevronForwardOutline, IoTimeOutline } from "react-icons/io5";
import { IoMdPlay, IoIosPause, IoIosList } from "react-icons/io";
import { RxShuffle } from "react-icons/rx";
import { GoPlusCircle } from "react-icons/go";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { parseBlob } from 'music-metadata-browser';
import { useSearchParams } from "next/navigation";

interface Song {
    title: string;
    album: string;
    artist: string;
    duration: string;
    picture: string;
    filePath: string;
    durationSeconds: number;
}

interface SongData {
    title: string;
    images: { url: string }[];
    albumId: number;
    length: string;
    song_preview: string;
    ratings: number;
    collaborators: string[];
    url: string;
}

interface AlbumData {
    name: string;
    images: { url: string }[];
    price: number;
    genreId: number;
    track_no: number;
    ratings: number;
    url: string;
}

const List: React.FC = () => {


    const [currentSong, setCurrentSong] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
    const [isShuffle, setIsShuffle] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [showTransition, setShowTransition] = useState(false);
    const searchParams = useSearchParams();
    const [songData, setSongData] = useState<SongData[]>([]);
    const [albumData, setAlbumData] = useState<AlbumData>();


    const loadSongs = async () => {
        const songFiles = [
            "/_Peter Manos - In My Head.mp3",
            "/Twinbed - Trouble I'm in (Lyrics).m4a",
            "/The Walters -- I Love You So.m4a",
            "/The Neighbourhood - Say My Name-Cry Me A River.m4a",
            "/Sweater Weather.m4a",
            "/Lana Del Rey - Say Yes To Heaven (Official Audio).m4a",
            "/Hozier - Take Me To Church.m4a",
            "/Amber Run - I Found.m4a",
            "/Shinunoga E-Wa.m4a",
            "/神山羊 - YELLOW【Music Video】- Yoh Kamiyama - YELLOW.m4a",
            "/なとり - Overdose.m4a",
            "/Jujutsu Kaisen - Opening 1 Full『Kaikai Kitan』by Eve (Lyrics KAN-ROM-ENG).m4a",
            "/『SPY×FAMILY』第2クールエンディング主題歌アニメ映像（ノンクレジット）／“SPY x FAMILY” part2 Ending theme song .m4a",
            "/Birdy - Skinny Love.m4a",
            "/Billie Eilish - idontwannabeyouanymore.m4a",
            "/David Kushner - Daylight (Official Music Video).m4a",
            "/I've got my eye on you..m4a",
            "/JVKE - golden hour (Fujii Kaze Remix).m4a",
            "/Lana Del Rey - Doin Time (Official Audio).m4a",
            "/Lana Del Rey - Summertime Sadness (Official Music Video).m4a",
            "/Lord Huron - The Night We Met (Official Audio).m4a",
            "/Birdy - Skinny Love.m4a",
            "/ALL NIGHT - THE VAMPS.m4a",
            "/ADONA - Climb.m4a",
            "/Alec Benjamin - Let Me Down Slowly.m4a",
            "/alextbh - still mine.m4a",
            "/Ali Gatie - It's You.m4a",
            "/Astrid S - Hurts So Good _ WITH LYRICS.m4a",
            "/Before You Exit - Clouds (Official Audio).m4a",
            "/blackbear - idfc.m4a",
            "/Blooom - Be Around.m4a",
        ];

        const songPromises = songFiles.map(async (filePath) => {
            try {
                const response = await fetch(filePath);
                const blob = await response.blob();
                const metadata = await parseBlob(blob);

                const durationSeconds = metadata.format.duration || 0;
                const duration = durationSeconds
                    ? `${Math.floor(durationSeconds / 60)}:${('0' + Math.floor(durationSeconds % 60)).slice(-2)}`
                    : 'Unknown Duration';

                return {
                    title: metadata.common.title || filePath.split('/').pop()!.split('.')[0],
                    album: metadata.common.album || 'Unknown Album',
                    artist: metadata.common.artist || 'Unknown Artist',
                    duration: duration || 'Unknown Duration',
                    picture: metadata.common.picture ? URL.createObjectURL(new Blob([metadata.common.picture[0].data])) : '/moon.jpg',
                    filePath,
                    durationSeconds: durationSeconds,
                };
            } catch (error) {
                console.error(`Error parsing metadata for ${filePath}:`, error);
                return {
                    title: filePath.split('/').pop()!.split('.')[0],
                    album: 'Unknown Album',
                    artist: 'Unknown Artist',
                    duration: 'Unknown Duration',
                    picture: '/moon.jpg',
                    filePath,
                    durationSeconds: 0,
                };
            }
        });

        const loadedSongs = await Promise.all(songPromises);
        setSongs(loadedSongs);
    };

    useEffect(() => {
        loadSongs();
        setShowTransition(true);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("ended", handleSongEnded);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("ended", handleSongEnded);
            }
        };
    }, [currentSong]);

    const handlePlayPause = (index: number, filePath: string) => {
        if (currentSong === index && isPlaying) {
            setIsPlaying(false);
            setCurrentTime(audioRef.current?.currentTime || 0);
            audioRef.current?.pause();
        } else {
            setCurrentSong(index);
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = filePath;
                audioRef.current.currentTime = currentTime;
                audioRef.current.play();
            }
        }
    };

    const handleShuffle = () => {
        if (isShuffle) {
            setIsShuffle(false);
            setShuffledOrder([]);
        } else {
            const shuffledIndices = Array.from({ length: songs.length }, (_, i) => i).sort(() => Math.random() - 0.5);
            setShuffledOrder(shuffledIndices);
            setIsShuffle(true);
            if (shuffledIndices.length > 0) {
                handlePlayPause(shuffledIndices[0], songs[shuffledIndices[0]].filePath);
            }
        }
    };

    const handleSongEnded = () => {
        if (isShuffle && currentSong !== null) {
            const currentIndex = shuffledOrder.indexOf(currentSong);
            if (currentIndex < shuffledOrder.length - 1) {
                const nextIndex = shuffledOrder[currentIndex + 1];
                setCurrentSong(nextIndex);
                setIsPlaying(true);
                if (audioRef.current) {
                    audioRef.current.src = songs[nextIndex].filePath;
                    audioRef.current.play();
                }
            } else {
                setCurrentSong(null);
                setIsPlaying(false);
            }
        } else {
            if (currentSong !== null && currentSong < songs.length - 1) {
                setCurrentSong(currentSong + 1);
                setIsPlaying(true);
                if (audioRef.current) {
                    audioRef.current.src = songs[currentSong + 1].filePath;
                    audioRef.current.play();
                }
            } else {
                setCurrentSong(null);
                setIsPlaying(false);
            }
        }
    };

    const playPauseControl = () => {
        if (currentSong === null) {
            handlePlayPause(0, songs[0].filePath);
        } else {
            handlePlayPause(currentSong, songs[currentSong].filePath);
        }
    };

    const totalDurationSeconds = songs.reduce((total, song) => total + song.durationSeconds, 0);
    const totalDurationMinutes = Math.floor(totalDurationSeconds / 60);
    const totalDurationHours = Math.floor(totalDurationMinutes / 60);
    const formattedTotalDuration = `${totalDurationHours}hr ${totalDurationMinutes % 60}min`;
    // console.log("Total Duration Seconds:", totalDurationSeconds);
    // console.log("Total Duration Minutes:", totalDurationMinutes);
    // console.log("Total Duration Hours:", totalDurationHours);

    const id = searchParams.get('id');
    console.log("id:", id);

    useEffect(() => {
        if (id) {
            getData(id);
        }
    }, [id]);

    const getData = async (id: string) => {
        try {
            const res = await fetch(`/api/album/${id}`);
            const json = await res.json();
            console.log("data:", json);
            setAlbumData(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log("dataa:",albumData);

    return (
        <div className={`min-h-[100vh] list-bg text-white`}>
            <div className="text-white flex justify-between text-3xl mb-3 pt-7 px-7">
                <div className="flex gap-5 arrow">
                    <IoChevronBackOutline className="rounded-full p-1 bg-black bg-opacity-30 direction" />
                    <IoChevronForwardOutline className="rounded-full p-1 bg-black bg-opacity-30 direction" />
                </div>
                <div className="flex gap-5">
                    <FaRegBell className="rounded-full p-2 bg-black bg-opacity-30" />
                    <HiOutlineUserGroup className="rounded-full p-1 bg-black bg-opacity-30" />
                </div>
            </div>

            <div className="flex gap-7 items-end my-7 px-7">
                <img src="/moon.jpg" className="w-40 h-40 object-cover box-shadow rounded-sm" />
                <div className="flex flex-col gap-2">
                    <div className="text-xs">Public Playlist</div>
                    <div className="text-6xl font-bold">{albumData?.name}</div>
                    <div className="text-stone-300 text-xs flex flex-col gap-1">
                        <div>Taylor Swift, Flo Rida, Black Eyed Peas and more</div>
                        <div>{songs.length} songs, {formattedTotalDuration}</div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-black bg-opacity-20 min-h-96 p-7">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <div className="text-black rounded-full bg-green-500 w-10 h-10 flex items-center justify-center cursor-pointer" onClick={playPauseControl}>
                            {isPlaying ? <IoIosPause /> : <IoMdPlay />}
                        </div>
                        <RxShuffle className={`text-xl text-gray-300 cursor-pointer ${isShuffle? "text-white" : ""}`} onClick={handleShuffle} />
                        <GoPlusCircle className="text-xl text-gray-300" />
                        <MdOutlineDownloadForOffline className="text-xl text-gray-300" />
                        <div className="text-xl text-gray-300">...</div>
                    </div>
                    <div className="flex gap-3">
                        <div>
                            <CiSearch className="text-gray-300" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-300">Custom order <span className="text-lg"><IoIosList /></span></div>
                    </div>
                </div>

                <div className="mt-7">
                    <div className="flex text-sm text-gray-300 border-b border-gray-500 pb-2 px-4 mb-5">
                        <div className="min-w-[3%] text-center">#</div>
                        <div className="min-w-[48%]">Title</div>
                        <div className="min-w-[42%]">Album</div>
                        <div className="min-w-[7%] flex justify-center"><IoTimeOutline className="text-lg" /></div>
                    </div>

                    <audio ref={audioRef} />

                    {songs.map((song, index) => (
                        <div key={index} className={`flex text-sm text-gray-300 py-2 px-4 items-center cursor-pointer hover:bg-white hover:bg-opacity-5 ${currentSong === index && isPlaying ? "" : ""}`} onClick={() => handlePlayPause(index, song.filePath)}>
                            <div className="min-w-[3%] text-center">
                                {currentSong === index && isPlaying ? (
                                    <img src="/a.gif" className="w-11 h-11"/>
                                ) : (
                                    <>{index + 1}</>
                                )}
                            </div>
                            <div className="min-w-[48%] flex gap-3 items-center">
                                <img src={song.picture} className="w-11 h-11 object-cover rounded-md" />
                                <div>
                                    <div className="text-white line-clamp-2">{song.title}</div>
                                    <div className="text-xs">{song.artist}</div>
                                </div>
                            </div>
                            <div className="min-w-[42%] line-clamp-2">{song.album}</div>
                            <div className="min-w-[7%] flex justify-center">{song.duration}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default List;
