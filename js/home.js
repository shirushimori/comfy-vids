class HomeApp {
    constructor() {
        this.videos = [];
    }

    async init() {
        this.videos = await SharedData.loadVideos();
        this.renderVideoGrid();
        this.setupEventListeners();
        SharedData.setupContextMenu();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const videoCard = e.target.closest('.video-card');
            if (videoCard) {
                const videoId = videoCard.dataset.videoId;
                if (videoId) {
                    SharedData.setSelectedVideoId(videoId);
                    SharedData.setSelectedSeason('1');
                    window.location.href = 'player.html';
                }
            }
        });
    }

    renderVideoGrid() {
        const grid = document.getElementById('videoGrid');
        if (!grid) return;

        grid.innerHTML = '';
        
        if (this.videos.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No videos found</p>';
            return;
        }

        this.videos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.dataset.videoId = video.id;
            card.innerHTML = `
                <div class="thumbnail-wrapper">
                    <img src="${video['thumbnail-img-url']}" alt="${video.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22180%22%3E%3Crect fill=%22%230a0a0a%22 width=%22320%22 height=%22180%22/%3E%3C/svg%3E'">
                </div>
                <div class="video-card-info">
                    <h3>${video.title}</h3>
                    <p>${video.author}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new HomeApp();
    app.init();
});
