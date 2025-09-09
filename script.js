document.addEventListener('DOMContentLoaded', () => {
    const mainNode = document.querySelector('.main-node');
    const branches = document.querySelectorAll('.branch');
    const nodes = document.querySelectorAll('.node');
    const detailNodes = document.querySelectorAll('.detail-node');

    // Hiệu ứng ban đầu: chỉ hiển thị nút chính khi tải trang
    mainNode.style.animation = 'pulse 2s infinite ease-in-out';

    // Thêm sự kiện click vào nút chính
    mainNode.addEventListener('click', () => {
        // Ẩn nút chính đi
        mainNode.style.opacity = '0';
        mainNode.style.transform = 'scale(0.8)';
        
        // Hiển thị các nhánh con một cách tuần tự
        setTimeout(() => {
            branches.forEach((branch, index) => {
                setTimeout(() => {
                    branch.style.opacity = '1';
                    branch.style.transform = 'scale(1)';
                }, index * 300); // Hiệu ứng trễ 0.3s giữa các nhánh
            });
            drawConnections(); // Vẽ các đường nối sau khi các nhánh hiện ra
        }, 500); // Chờ 0.5s sau khi click
    });

    // Sự kiện khi click vào các nút nhánh con để hiển thị nội dung chi tiết
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const parent = node.parentNode;
            const subBranches = parent.querySelectorAll('.sub-branch');
            
            subBranches.forEach((subBranch, index) => {
                 setTimeout(() => {
                    subBranch.style.opacity = '1';
                    subBranch.style.transform = 'translateY(0)';
                }, index * 200);
            });
            
            const detail = parent.querySelector('.detail-node');
            if (detail) {
                detail.style.opacity = '1';
                detail.style.transform = 'scale(1)';
            }
        });
    });

    // Hàm vẽ đường nối giữa các node (giữ nguyên)
    const drawConnections = () => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('class', 'mindmap-connections');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        document.querySelector('.mindmap-container').appendChild(svg);

        const mainNodeRect = mainNode.getBoundingClientRect();

        branches.forEach(branch => {
            const branchNodeRect = branch.querySelector('.node').getBoundingClientRect();
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', '#e94560');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('class', 'connection-path');
            path.style.transition = 'stroke-dashoffset 2s ease-out';
            path.style.strokeDasharray = '500';
            path.style.strokeDashoffset = '500';

            const startX = mainNodeRect.left + mainNodeRect.width / 2;
            const startY = mainNodeRect.top + mainNodeRect.height / 2;
            const endX = branchNodeRect.left + branchNodeRect.width / 2;
            const endY = branchNodeRect.top + branchNodeRect.height / 2;

            const controlPointX = startX + (endX - startX) / 2;
            const controlPointY = (startY < endY) ? startY + 50 : startY - 50;

            const d = `M${startX},${startY} Q${controlPointX},${controlPointY} ${endX},${endY}`;
            path.setAttribute('d', d);
            svg.appendChild(path);

            setTimeout(() => {
                path.style.strokeDashoffset = '0';
            }, 1500);
        });
    };
});