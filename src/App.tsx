import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/Login";
import Dashboard from "./components/Dashboard";
import ArtistPage from "./components/ArtistPage";
import AlbumPage from "./components/AlbumPage";
import TrackPage from "./components/TrackPage";
import PlaylistPage from "./components/PlaylistPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/artist" element={<ArtistPage />}></Route>
        <Route path="/album" element={<AlbumPage />}></Route>
        <Route path="/track" element={<TrackPage />}></Route>
        <Route path="/playlist" element={<PlaylistPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
