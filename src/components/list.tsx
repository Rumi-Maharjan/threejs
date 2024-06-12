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

interface Song {
    title: string;
    album: string;
    artist: string;
    duration: string;
    picture: string;
    filePath: string;
    durationSeconds: number;
}

const List: React.FC = () => {

    // const [songs, setSongs] = useState<Song[]>([
    //     {
    //         title: "In My Head",
    //         album: "Peter Manos",
    //         artist: "Peter Manos",
    //         duration: "04:23",
    //         picture: "/moon.jpg",
    //         filePath: "/Peter Manos - In My Head.mp3"
    //     },
    //     {
    //         title: "Trouble I'm in",
    //         album: "Twinbed",
    //         artist: "Twinbed",
    //         duration: "03:45",
    //         picture: "/Picture.png",
    //         filePath: "/Twinbed - Trouble I'm in (Lyrics).m4a"
    //     },
    //     {
    //         title: "I Love You So",
    //         album: "The Walters -- I Love You So",
    //         artist: "The Walters",
    //         duration: "04:23",
    //         picture: "/cyro.png",
    //         filePath: "/The Walters -- I Love You So.m4a"
    //     },
    //     {
    //         title: "Say My Name-Cry Me A River",
    //         album: "The Neighbourhood",
    //         artist: "The Neighbourhood",
    //         duration: "03:45",
    //         picture: "/owl planter.jpg",
    //         filePath: "/The Neighbourhood - Say My Name-Cry Me A River.m4a"
    //     },
    //     {
    //         title: "Sweater Weather",
    //         album: "Sweater Weather",
    //         artist: "Sweater Weather",
    //         duration: "04:23",
    //         picture: "/slider1.jpg",
    //         filePath: "/Sweater Weather.m4a"
    //     },
    //     {
    //         title: "Shinunoga E-Wa",
    //         album: "Fuji Kaje",
    //         artist: "Fuji Kaje",
    //         duration: "03:45",
    //         picture: "/4357971.jpg",
    //         filePath: "/Shinunoga E-Wa.m4a"
    //     },
    //     {
    //         title: "Overdose",
    //         album: "なとり",
    //         artist: "なとり",
    //         duration: "04:23",
    //         picture: "/cat3.jpg",
    //         filePath: "/なとり - Overdose.m4a"
    //     },
    //     {
    //         title: "YELLOW",
    //         album: "神山羊",
    //         artist: "Yoh Kamiyama",
    //         duration: "03:45",
    //         picture: "/cow planter.jpg",
    //         filePath: "/神山羊 - YELLOW【Music Video】- Yoh Kamiyama - YELLOW.m4a"
    //     },
    //     {
    //         title: "The Night We Met",
    //         album: "Lord Huron",
    //         artist: "Lord Huron",
    //         duration: "04:23",
    //         picture: "/nordic style candle holder.webp",
    //         filePath: "/Lord Huron - The Night We Met (Official Audio).m4a"
    //     },
    //     {
    //         title: "Summertime Sadness",
    //         album: "Lana Del Rey",
    //         artist: "Lana Del Rey",
    //         duration: "03:45",
    //         picture: "/Picture.png",
    //         filePath: "/Lana Del Rey - Summertime Sadness (Official Music Video).m4a"
    //     },
    //     {
    //         title: "Say Yes To Heaven",
    //         album: "Lana Del Rey",
    //         artist: "Lana Del Rey",
    //         duration: "03:45",
    //         picture: "/cyro.png",
    //         filePath: "/Lana Del Rey - Say Yes To Heaven (Official Audio).m4a"
    //     },
    //     {
    //         title: "Doin Time",
    //         album: "Lana Del Rey",
    //         artist: "Lana Del Rey",
    //         duration: "03:45",
    //         picture: "/Pot and candles.jpg",
    //         filePath: "/Lana Del Rey - Doin Time (Official Audio).m4a"
    //     },
    //     {
    //         title: "golden hour (Fujii Kaze Remix)",
    //         album: "JVKE",
    //         artist: "JVKE",
    //         duration: "03:45",
    //         picture: "/owl planter.jpg",
    //         filePath: "/JVKE - golden hour (Fujii Kaze Remix).m4a"
    //     },
    //     {
    //         title: "Kaikai Kitan",
    //         album: "Jujutsu Kaisen - Opening 1",
    //         artist: "Eve",
    //         duration: "03:45",
    //         picture: "/Picture.png",
    //         filePath: "/Jujutsu Kaisen - Opening 1 Full『Kaikai Kitan』by Eve (Lyrics KAN-ROM-ENG).m4a"
    //     },
    //     {
    //         title: "I've got my eye on you",
    //         album: "Album B",
    //         artist: "Artist",
    //         duration: "03:45",
    //         picture: "/slider1.jpg",
    //         filePath: "/I've got my eye on you..m4a"
    //     },
    //     {
    //         title: "Take Me To Church",
    //         album: "Hozier",
    //         artist: "Hozier",
    //         duration: "03:45",
    //         picture: "/moon.jpg",
    //         filePath: "/Hozier - Take Me To Church.m4a"
    //     },
    //     {
    //         title: "Matsuri",
    //         album: "Fujii Kaze",
    //         artist: "Fujii Kaze",
    //         duration: "03:45",
    //         picture: "/4357971.jpg",
    //         filePath: "/Fujii Kaze -  Matsuri (Official Video).m4a"
    //     },
    //     {
    //         title: "Daylight",
    //         album: "David Kushner",
    //         artist: "David Kushner",
    //         duration: "03:45",
    //         picture: "/cat3.jpg",
    //         filePath: "/David Kushner - Daylight (Official Music Video).m4a"
    //     },
    //     {
    //         title: "idontwannabeyouanymore",
    //         album: "Billie Eilish",
    //         artist: "Billie Eilish",
    //         duration: "03:45",
    //         picture: "/cow planter.jpg",
    //         filePath: "/Billie Eilish - idontwannabeyouanymore.m4a"
    //     },
    //     {
    //         title: "Skinny Love",
    //         album: "Birdy",
    //         artist: "Birdy",
    //         duration: "03:45",
    //         picture: "/cyro.png",
    //         filePath: "/Birdy - Skinny Love.m4a"
    //     },
    //     {
    //         title: "I Found",
    //         album: "Amber Run",
    //         artist: "Amber Run",
    //         duration: "03:45",
    //         picture: "/nordic style candle holder.webp",
    //         filePath: "/Amber Run - I Found.m4a"
    //     },
    //     {
    //         title: "ALL NIGHT",
    //         album: "THE VAMPS",
    //         artist: "THE VAMPS",
    //         duration: "03:45",
    //         picture: "/owl planter.jpg",
    //         filePath: "/ALL NIGHT - THE VAMPS.m4a"
    //     },
    //     {
    //         title: "“SPY x FAMILY” part2 Ending theme song",
    //         album: "SPY x FAMILY",
    //         artist: "ノンクレジット",
    //         duration: "03:45",
    //         picture: "/slider1.jpg",
    //         filePath: "/『SPY×FAMILY』第2クールエンディング主題歌アニメ映像（ノンクレジット）／“SPY x FAMILY” part2 Ending theme song .m4a"
    //     },
    // ]);

    const [currentSong, setCurrentSong] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
    const [isShuffle, setIsShuffle] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);

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
    console.log("Total Duration Seconds:", totalDurationSeconds);
console.log("Total Duration Minutes:", totalDurationMinutes);
console.log("Total Duration Hours:", totalDurationHours);

    return (
        <div className="min-h-[100vh] list-bg text-white">
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
                    <div className="text-6xl font-bold">Daily Mix 4</div>
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
                                    <img src="/a.gif" className="w-11 h-11" alt="Playing" />
                                ) : (
                                    <>{index + 1}</>
                                )}
                            </div>
                            <div className="min-w-[48%] flex gap-3 items-center">
                                <img src={song.picture} className="w-11 h-11 object-cover rounded-md" />
                                <div>
                                    <div className="text-white">{song.title}</div>
                                    <div className="text-xs">{song.artist}</div>
                                </div>
                            </div>
                            <div className="min-w-[42%]">{song.album}</div>
                            <div className="min-w-[7%] flex justify-center">{song.duration}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default List;
