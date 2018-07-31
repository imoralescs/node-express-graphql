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

// Helper to create video
export const createVideo =({ title, duration, watched }) => {
    const 
        id = Videos.length + 1,
        video = {
            id : id.toString(),
            title,
            duration,
            watched
        };
    
    // Save on memory
    Videos.push(video)
    
    return video
}