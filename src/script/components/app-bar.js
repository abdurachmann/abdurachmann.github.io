class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="jumbotron">
                <img src="/src/images/bird.png" alt="bird">
                <h3>You'll Never Walk Alone</h3>
            </div>

            <nav class="nav-wrapper yellow darken-1">
                <div class="container">
                    <a class="brand-logo red-text text-darken-4">Kabar Manuk</a>
                    <a href="" class="sidenav-trigger" data-target="mobile-menu">
                        <i class="material-icons red-text text-darken-4">menu</i>
                    </a>
                    <ul class="topnav right hide-on-med-and-down"></ul>
                </div>
            </nav>
            <ul class="sidenav yellow lighten-1" id="mobile-menu"></ul>
        `;
    }
}

customElements.define('app-bar', AppBar);