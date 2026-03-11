// Shared utilities for data management across pages

class SharedData {
    static loadSettings() {
        const saved = localStorage.getItem('comfyhub_settings');
        return saved ? JSON.parse(saved) : {
            selectedSources: ['mix'],
            customUrls: [],
            autoPlay: false,
            showDescriptions: true
        };
    }

    static saveSettings(settings) {
        localStorage.setItem('comfyhub_settings', JSON.stringify(settings));
    }

    static getSelectedVideoId() {
        return sessionStorage.getItem('selectedVideoId');
    }

    static setSelectedVideoId(id) {
        sessionStorage.setItem('selectedVideoId', id);
    }

    static getSelectedSeason() {
        return sessionStorage.getItem('selectedSeason') || '1';
    }

    static setSelectedSeason(season) {
        sessionStorage.setItem('selectedSeason', season);
    }

    static async loadVideos() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Failed to load data.json');
            return await response.json();
        } catch (error) {
            console.error('Error loading videos:', error);
            return [];
        }
    }

    static setupContextMenu() {
        const contextMenu = document.getElementById('contextMenu');
        if (!contextMenu) return;

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            contextMenu.style.display = 'block';
            contextMenu.style.left = e.pageX + 'px';
            contextMenu.style.top = e.pageY + 'px';
        });

        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                contextMenu.style.display = 'none';
            }
        });

        document.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = item.dataset.action;
                SharedData.handleContextAction(action);
                contextMenu.style.display = 'none';
            });
        });
    }

    static handleContextAction(action) {
        switch (action) {
            case 'copy-link':
                navigator.clipboard.writeText(window.location.href);
                break;
            case 'open-new-tab':
                window.open(window.location.href, '_blank');
                break;
            case 'reload':
                location.reload();
                break;
        }
    }

    static formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
}
