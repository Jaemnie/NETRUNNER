class TreeNode {
    constructor(name, type) {
        this.name = name;  // 노드의 이름
        this.type = type;  // 노드의 타입 (파일 또는 디렉토리)
        this.children = [];  // 노드의 자식들
    }
    addChild(child) {
        this.children.push(child);  // 자식 노드 추가
    }
    removeChild(childName) {
        this.children = this.children.filter(child => child.name !== childName);  // 자식 노드 제거
    }
}

class FileSystem {
    constructor() {
        this.root = new TreeNode("/", "directory");  // 루트 디렉토리 생성
    }
    // 파일 생성 메서드
    createFile(path) {
        const segments = path.split('/');
        let current = this.root;
        // 경로를 따라가면서 해당 디렉토리까지 이동
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            // 현재 디렉토리의 자식들 중에서 해당 디렉토리를 찾음
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;  // 해당 디렉토리로 이동
                    found = true;
                    break;
                }
            }
            // 해당 디렉토리가 없으면 오류 발생
            if (!found) {
                throw new Error(`Invalid path: ${path}`);
            }
        }
        // 파일 노드 생성 및 추가
        const filename = segments[segments.length - 1];
        const fileNode = new TreeNode(filename, 'file');
        current.addChild(fileNode);
    }
    // 디렉토리 생성 메서드
    createDirectory(path) {
        const segments = path.split('/');
        let current = this.root;
        // 경로를 따라가면서 디렉토리 생성
        for (let i = 1; i < segments.length; i++) {
            const segment = segments[i];
            let found = false;
            // 현재 디렉토리의 자식들 중에서 해당 디렉토리를 찾음
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;  // 해당 디렉토리로 이동
                    found = true;
                    break;
                }
            }
            // 해당 디렉토리가 없으면 새로운 디렉토리 생성
            if (!found) {
                const directoryNode = new TreeNode(segment, 'directory');
                current.addChild(directoryNode);
                current = directoryNode;
            }
        }
    }
    // 파일 삭제 메서드
    deleteFile(path) {
        const segments = path.split('/');
        const filename = segments[segments.length - 1];
        let current = this.root;
        // 경로를 따라가면서 해당 파일을 찾음
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            // 현재 디렉토리의 자식들 중에서 해당 디렉토리를 찾음
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;  // 해당 디렉토리로 이동
                    found = true;
                    break;
                }
            }
            // 해당 디렉토리가 없으면 오류 발생
            if (!found) {
                throw new Error(`Invalid path: ${path}`);
            }
        }
        // 파일을 삭제
        current.removeChild(filename);
    }
    // 디렉토리 삭제 메서드
    deleteDirectory(path) {
        const segments = path.split('/');
        const dirname = segments[segments.length - 1];
        let current = this.root;
        // 경로를 따라가면서 해당 디렉토리를 찾음
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            // 현재 디렉토리의 자식들 중에서 해당 디렉토리를 찾음
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;  // 해당 디렉토리로 이동
                    found = true;
                    break;
                }
            }
            // 해당 디렉토리가 없으면 오류 발생
            if (!found) {
                throw new Error(`Invalid path: ${path}`);
            }
        }
        // 디렉토리를 삭제
        current.removeChild(dirname);
    }
    // 파일 시스템 출력 메서드
    printFileSystem() {
        this._traverseFileSystem(this.root, '');
    }
    // 파일 시스템을 깊이 우선으로 탐색하면서 출력하는 메서드
    _traverseFileSystem(node, indent) {
        console.log(indent + node.name);  // 노드 출력
        // 자식 노드들을 재귀적으로 탐색
        for (const child of node.children) {
            this._traverseFileSystem(child, indent + '  ');
        }
    }
    // 절대 경로, 상대 경로, 하위 디렉토리의 파일 및 디렉토리 목록을 반환하는 메서드
    getPathInfo(path) {
        const segments = path.split('/');
        let current = this.root;
        let absolutePath = '/';
        let relativePath = '';
        let files = [];
        let filestype = [];
        // 루트 디렉토리 처리
        if (path === '/') {
            relativePath = '/';
        } else {
            // 절대 경로와 상대 경로 생성
            for (let i = 1; i < segments.length; i++) {
                const segment = segments[i];
                let found = false;

                for (const child of current.children) {
                    if (child.name === segment && child.type === 'directory') {
                        current = child;
                        absolutePath += `${segment}/`;
                        relativePath += `${segment}/`;
                        found = true;
                        break;
                    }
                }

                // 디렉토리가 없는 경우 오류 발생
                if (!found) {
                    throw new Error(`Invalid path: ${path}`);
                }
            }
        }
        // 현재 디렉토리의 파일 및 디렉토리 목록 생성
        for (const child of current.children) {
            if (child.type === 'file' || child.type === 'directory') {
                files.push(child.name);
                filestype.push(child.type);
            }
        }
        return { absolutePath, relativePath, files, filestype };
    }
    isOverlap(filename, currentPath) { //같은 파일이 존재할시 false반환
        let found = false;
        let temp = this.getPathInfo(currentPath).files;
        for (const key in temp) {
            console.log(temp[key]);
            if (temp[key] == filename) {
                found = true;
            }
        }
        if (found) {
            return false;
        } else {
            return true;
        }
    }
    findDirectory(path) {
        const segments = path.split('/');
        const filename = segments[segments.length - 1];
        let current = this.root;
        let pathfinder = true;
        // 경로를 따라가면서 해당 파일을 찾음
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            // 현재 디렉토리의 자식들 중에서 해당 디렉토리를 찾음
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;  // 해당 디렉토리로 이동
                    found = true;
                    break;
                }
            }
            // 해당 디렉토리가 없으면 오류 발생
            if (!found) {
                pathfinder = false;
            }
        }
        return pathfinder;
    }
}
// const fs = new FileSystem();
// fs.createDirectory("/root");
// fs.createDirectory("/tmp");
// fs.createDirectory("/home/user")
// fs.createFile("/home/user/file1.txt");
// fs.createFile("/home/user/file2.txt");
// fs.createDirectory("/home/user/documents");
// fs.createFile("/home/user/documents/document1.txt");

// console.log(fs.printFileSystem());

// fs.deleteDirectory("/home/user");

// console.log(fs.printFileSystem());

// fs.createDirectory("/home/user");

// console.log(fs.printFileSystem());

export { FileSystem };
