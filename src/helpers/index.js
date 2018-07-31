import Videos from '../data/videos'

// Helper for find element on video
export const getVideoById = (id) => new Promise((resolve) => {
    const [video] = Videos.filter((video) => {
        return video.id === id
    })
    
    resolve(video)
})

// Helper to get all video
export const getVideos = () => new Promise((resolve) => resolve(Videos))