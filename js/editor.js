class JSONEditor {
    constructor(app) {
        this.app = app;
        this.editingVideos = [];
        this.selectedVideoId = null;
        this.init();
    }

    init() {
        const openEditorBtn = document.getElementById('openEditorBtn');
        const closeEditorBtn = document.getElementById('closeEditor');
        const cancelEditorBtn = document.getElementById('cancelEditorBtn');
        const saveJsonBtn = document.getElementById('saveJsonBtn');
        const addVideoBtn = document.getElementById('addVideoBtn');
        const editorOverlay = document.getElementById('editorOverlay');

        if (openEditorBtn) {
            openEditorBtn.addEventListener('click', () => this.openEditor());
        }
        if (closeEditorBtn) {
            closeEditorBtn.addEventListener('click', () => this.closeEditor());
        }
        if (cancelEditorBtn) {
            cancelEditorBtn.addEventListener('click', () => this.closeEditor());
        }
        if (saveJsonBtn) {
            saveJsonBtn.addEventListener('click', () => this.saveJSON());
        }
        if (addVideoBtn) {
            addVideoBtn.addEventListener('click', () => this.addNewVideo());
        }
        if (editorOverlay) {
            editorOverlay.addEventListener('click', (e) => {
                if (e.target === editorOverlay) this.closeEditor();
            });
        }
    }

    openEditor() {
        this.editingVideos = JSON.parse(JSON.stringify(this.app.videos));
        this.renderVideosList();
        document.getElementById('editorOverlay').classList.add('show');
    }

    closeEditor() {
        document.getElementById('editorOverlay').classList.remove('show');
        this.selectedVideoId = null;
    }

    renderVideosList() {
        const list = document.getElementById('videosList');
        list.innerHTML = this.editingVideos.map(video => `
            <div class="editor-list-item ${this.selectedVideoId === video.id ? 'active' : ''}" data-video-id="${video.id}">
                <span class="editor-list-item-title">${video.title}</span>
                <button class="editor-list-item-delete" data-video-id="${video.id}">×</button>
            </div>
        `).join('');

        document.querySelectorAll('.editor-list-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('editor-list-item-delete')) {
                    this.selectVideo(parseInt(item.dataset.videoId));
                }
            });
        });

        document.querySelectorAll('.editor-list-item-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoId = parseInt(btn.dataset.videoId);
                this.deleteVideo(videoId);
            });
        });
    }

    selectVideo(videoId) {
        this.selectedVideoId = videoId;
        this.renderVideosList();
        this.renderVideoEditor();
    }

    renderVideoEditor() {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        const content = document.getElementById('editorContent');
        content.innerHTML = `
            <div class="editor-section">
                <h3>Video Details</h3>
                <div class="editor-form-group">
                    <label>Title</label>
                    <input type="text" class="video-title-input" value="${video.title}">
                </div>
                <div class="editor-form-group">
                    <label>Author</label>
                    <input type="text" class="video-author-input" value="${video.author}">
                </div>
                <div class="editor-form-group">
                    <label>Description</label>
                    <textarea class="video-description-input">${video.description}</textarea>
                </div>
                <div class="editor-form-group">
                    <label>Thumbnail URL</label>
                    <input type="url" class="video-thumbnail-input" value="${video['thumbnail-img-url']}">
                </div>
            </div>

            <div class="editor-section">
                <h3>Seasons</h3>
                <div class="seasons-container" id="seasonsContainer"></div>
                <button class="add-season-btn" id="addSeasonBtn">+ Add Season</button>
            </div>
        `;

        this.renderSeasons();
        this.setupVideoInputListeners();
        document.getElementById('addSeasonBtn').addEventListener('click', () => this.addSeason());
    }

    renderSeasons() {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        const container = document.getElementById('seasonsContainer');
        container.innerHTML = video.seasons.map((season, seasonIndex) => `
            <div class="season-item">
                <div class="season-header">
                    <div class="season-title">Season ${season.season}</div>
                    <div class="season-actions">
                        <button class="btn-small" data-season-index="${seasonIndex}">Edit</button>
                        <button class="btn-small danger" data-season-index="${seasonIndex}">Delete</button>
                    </div>
                </div>
                <div class="episodes-list" id="episodes-${seasonIndex}"></div>
                <button class="add-episode-btn" data-season-index="${seasonIndex}">+ Add Episode</button>
            </div>
        `).join('');

        video.seasons.forEach((season, seasonIndex) => {
            this.renderEpisodes(seasonIndex);
        });

        document.querySelectorAll('.add-episode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seasonIndex = parseInt(e.target.dataset.seasonIndex);
                this.addEpisode(seasonIndex);
            });
        });

        document.querySelectorAll('.season-actions .btn-small.danger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seasonIndex = parseInt(e.target.dataset.seasonIndex);
                this.deleteSeason(seasonIndex);
            });
        });
    }

    renderEpisodes(seasonIndex) {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        const season = video.seasons[seasonIndex];
        const container = document.getElementById(`episodes-${seasonIndex}`);
        
        container.innerHTML = season.episodes.map((episode, episodeIndex) => `
            <div class="episode-item-editor">
                <div class="episode-item-editor-header">
                    <div class="episode-item-editor-title">Episode ${episode.episode}</div>
                    <button class="btn-small danger" data-season-index="${seasonIndex}" data-episode-index="${episodeIndex}">Delete</button>
                </div>
                <div class="episode-fields">
                    <input type="number" class="episode-number-input" value="${episode.episode}" placeholder="Episode #">
                    <input type="text" class="episode-title-input" value="${episode.title}" placeholder="Episode Title">
                    <div class="episode-iframe-field">
                        <textarea class="episode-iframe-input" placeholder="Paste iframe code here">${episode['video-iframe']}</textarea>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll(`#episodes-${seasonIndex} .episode-number-input`).forEach((input, index) => {
            input.addEventListener('change', (e) => {
                season.episodes[index].episode = parseInt(e.target.value);
            });
        });

        document.querySelectorAll(`#episodes-${seasonIndex} .episode-title-input`).forEach((input, index) => {
            input.addEventListener('change', (e) => {
                season.episodes[index].title = e.target.value;
            });
        });

        document.querySelectorAll(`#episodes-${seasonIndex} .episode-iframe-input`).forEach((input, index) => {
            input.addEventListener('change', (e) => {
                season.episodes[index]['video-iframe'] = e.target.value;
            });
        });

        document.querySelectorAll(`#episodes-${seasonIndex} .btn-small.danger`).forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seasonIdx = parseInt(e.target.dataset.seasonIndex);
                const episodeIdx = parseInt(e.target.dataset.episodeIndex);
                this.deleteEpisode(seasonIdx, episodeIdx);
            });
        });
    }

    setupVideoInputListeners() {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        document.querySelector('.video-title-input').addEventListener('change', (e) => {
            video.title = e.target.value;
        });

        document.querySelector('.video-author-input').addEventListener('change', (e) => {
            video.author = e.target.value;
        });

        document.querySelector('.video-description-input').addEventListener('change', (e) => {
            video.description = e.target.value;
        });

        document.querySelector('.video-thumbnail-input').addEventListener('change', (e) => {
            video['thumbnail-img-url'] = e.target.value;
        });
    }

    addNewVideo() {
        const newId = Math.max(...this.editingVideos.map(v => v.id), 0) + 1;
        const newVideo = {
            id: newId,
            title: 'New Video',
            description: '',
            'thumbnail-img-url': '',
            author: 'Author',
            'date-time': new Date().toISOString(),
            seasons: [{
                season: 1,
                episodes: [{
                    episode: 1,
                    title: 'Episode 1',
                    'video-iframe': ''
                }]
            }]
        };
        this.editingVideos.push(newVideo);
        this.renderVideosList();
        this.selectVideo(newId);
    }

    addSeason() {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        const newSeasonNum = Math.max(...video.seasons.map(s => s.season), 0) + 1;
        video.seasons.push({
            season: newSeasonNum,
            episodes: [{
                episode: 1,
                title: 'Episode 1',
                'video-iframe': ''
            }]
        });
        this.renderSeasons();
    }

    addEpisode(seasonIndex) {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        const season = video.seasons[seasonIndex];
        const newEpisodeNum = Math.max(...season.episodes.map(e => e.episode), 0) + 1;
        season.episodes.push({
            episode: newEpisodeNum,
            title: `Episode ${newEpisodeNum}`,
            'video-iframe': ''
        });
        this.renderEpisodes(seasonIndex);
    }

    deleteVideo(videoId) {
        this.editingVideos = this.editingVideos.filter(v => v.id !== videoId);
        this.selectedVideoId = null;
        this.renderVideosList();
        document.getElementById('editorContent').innerHTML = '<div class="no-video-selected">Select a video to edit</div>';
    }

    deleteSeason(seasonIndex) {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        video.seasons.splice(seasonIndex, 1);
        this.renderSeasons();
    }

    deleteEpisode(seasonIndex, episodeIndex) {
        const video = this.editingVideos.find(v => v.id === this.selectedVideoId);
        if (!video) return;

        video.seasons[seasonIndex].episodes.splice(episodeIndex, 1);
        this.renderEpisodes(seasonIndex);
    }

    saveJSON() {
        const dataStr = JSON.stringify(this.editingVideos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.json';
        link.click();
        URL.revokeObjectURL(url);

        this.app.videos = this.editingVideos;
        this.closeEditor();
        alert('JSON saved! Download started.');
    }
}

// Initialize editor when app is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.app) {
            window.editor = new JSONEditor(window.app);
        }
    }, 100);
});
