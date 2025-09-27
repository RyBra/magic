// Виртуальная дверь в несуществующем мире
document.addEventListener('DOMContentLoaded', function() {
    // Создаем контейнер для виртуального мира
    const world = document.createElement('div');
    world.id = 'virtualWorld';
    world.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        transition: all 2s ease-in-out;
    `;
    
    // Создаем дверь
    const door = document.createElement('div');
    door.id = 'mysticalDoor';
    door.style.cssText = `
        width: 300px;
        height: 500px;
        background: linear-gradient(45deg, #8B4513, #A0522D);
        border: 8px solid #654321;
        border-radius: 15px;
        position: relative;
        cursor: pointer;
        transition: all 0.8s ease;
        box-shadow: 
            0 0 30px rgba(0,0,0,0.5),
            inset 0 0 20px rgba(255,255,255,0.1);
        transform-style: preserve-3d;
    `;
    
    // Создаем ручку двери
    const doorHandle = document.createElement('div');
    doorHandle.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #FFD700, #FFA500);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(255,215,0,0.8);
        transition: all 0.3s ease;
    `;
    
    // Создаем портал внутри двери
    const portal = document.createElement('div');
    portal.style.cssText = `
        position: absolute;
        top: 50px;
        left: 50px;
        right: 50px;
        bottom: 50px;
        background: radial-gradient(circle, 
            rgba(255,255,255,0.1) 0%, 
            rgba(0,0,0,0.8) 50%, 
            rgba(0,0,0,0.95) 100%);
        border-radius: 10px;
        opacity: 0.7;
        transition: all 1s ease;
        overflow: hidden;
    `;
    
    // Создаем звезды в портале
    const stars = document.createElement('div');
    stars.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
        background-repeat: repeat;
        background-size: 200px 100px;
        animation: twinkle 3s infinite;
    `;
    
    // Создаем инструкцию
    const instruction = document.createElement('div');
    instruction.style.cssText = `
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-family: 'Arial', sans-serif;
        font-size: 18px;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        opacity: 0.9;
        animation: pulse 2s infinite;
    `;
    instruction.textContent = 'Нажмите на дверь, чтобы войти в другой мир...';
    
    // Создаем эффект частиц
    const particles = document.createElement('div');
    particles.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    // Добавляем элементы
    portal.appendChild(stars);
    door.appendChild(doorHandle);
    door.appendChild(portal);
    door.appendChild(instruction);
    world.appendChild(door);
    world.appendChild(particles);
    document.body.appendChild(world);
    
    // Состояние двери
    let isDoorOpen = false;
    let isInOtherWorld = false;
    let worldState = 0; // 0 - исходный мир, 1 - мир за дверью
    
    // Функция создания частиц
    function createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${2 + Math.random() * 3}s infinite linear;
                opacity: ${0.3 + Math.random() * 0.7};
            `;
            particles.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }
    }
    
    // Функция открытия двери
    function openDoor() {
        if (isDoorOpen) return;
        
        isDoorOpen = true;
        door.style.transform = 'perspective(1000px) rotateY(-45deg)';
        doorHandle.style.transform = 'translateY(-50%) rotate(45deg)';
        portal.style.opacity = '1';
        portal.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)';
        
        // Создаем эффект всасывания
        createParticles();
        
        setTimeout(() => {
            enterOtherWorld();
        }, 1500);
    }
    
    // Функция входа в другой мир
    function enterOtherWorld() {
        isInOtherWorld = true;
        worldState = 1;
        
        // Меняем фон на другой мир
        world.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)';
        
        // Скрываем дверь
        door.style.opacity = '0';
        door.style.transform = 'scale(0.1)';
        
        // Создаем новый мир
            setTimeout(() => {
            createOtherWorld();
        }, 1000);
    }
    
    // Функция создания другого мира
    function createOtherWorld() {
        // Очищаем мир
        world.innerHTML = '';
        
        // Создаем плавающие острова
        for (let i = 0; i < 5; i++) {
            const island = document.createElement('div');
            island.style.cssText = `
                position: absolute;
                width: ${100 + Math.random() * 200}px;
                height: ${50 + Math.random() * 100}px;
                background: linear-gradient(45deg, #8B4513, #A0522D);
                border-radius: 50%;
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 80}%;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            `;
            world.appendChild(island);
        }
        
        // Создаем интерактивных персонажей
        createCharacters();
        
        // Создаем идеальную кнопку
        const magicButton = document.createElement('div');
        magicButton.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 120px;
            height: 120px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24);
            background-size: 400% 400%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 
                0 0 30px rgba(255,107,107,0.6),
                0 0 60px rgba(78,205,196,0.4),
                0 0 90px rgba(69,183,209,0.3);
            transition: all 0.4s ease;
            animation: magicPulse 2s infinite, gradientShift 3s infinite;
            border: 3px solid rgba(255,255,255,0.8);
            position: relative;
            overflow: hidden;
        `;
        magicButton.innerHTML = '✨<br><small style="font-size: 12px;">МАГИЯ</small>';
        world.appendChild(magicButton);

        // Создаем кнопку возврата
        const returnButton = document.createElement('div');
        returnButton.style.cssText = `
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 18px;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        returnButton.textContent = 'Вернуться через дверь';
        world.appendChild(returnButton);
        
        // Добавляем обработчик для кнопки возврата
        returnButton.addEventListener('click', returnToDoor);
        
        // Создаем приветственное сообщение
        const welcome = document.createElement('div');
        welcome.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 24px;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            animation: fadeIn 2s ease-in-out;
        `;
        welcome.innerHTML = 'Добро пожаловать в другой мир!<br><small>Здесь все возможно...</small>';
        world.appendChild(welcome);
        
        // Убираем приветствие через 3 секунды
        setTimeout(() => {
            if (welcome.parentNode) {
                welcome.style.opacity = '0';
                setTimeout(() => {
                    if (welcome.parentNode) {
                        welcome.parentNode.removeChild(welcome);
                    }
                }, 1000);
            }
        }, 3000);
        
        // Обработчики для магической кнопки
        magicButton.addEventListener('click', performMagic);
        magicButton.addEventListener('mouseenter', () => {
            magicButton.style.transform = 'scale(1.2) rotate(10deg)';
            magicButton.style.boxShadow = 
                '0 0 50px rgba(255,107,107,0.8), 0 0 100px rgba(78,205,196,0.6), 0 0 150px rgba(69,183,209,0.4)';
        });
        magicButton.addEventListener('mouseleave', () => {
            magicButton.style.transform = 'scale(1) rotate(0deg)';
            magicButton.style.boxShadow = 
                '0 0 30px rgba(255,107,107,0.6), 0 0 60px rgba(78,205,196,0.4), 0 0 90px rgba(69,183,209,0.3)';
        });

        // Обработчик возврата
        returnButton.addEventListener('click', returnToDoor);
        returnButton.addEventListener('mouseenter', () => {
            returnButton.style.transform = 'translateX(-50%) scale(1.1)';
        });
        returnButton.addEventListener('mouseleave', () => {
            returnButton.style.transform = 'translateX(-50%) scale(1)';
        });
    }
    
    // Функция возврата к двери
    function returnToDoor() {
        isInOtherWorld = false;
        isDoorOpen = false;
        worldState = 0;
        
        // Очищаем мир
        world.innerHTML = '';
        
        // Восстанавливаем исходный фон
        world.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        // Создаем дверь заново
        createDoor();
    }
    
    // Функция создания двери
    function createDoor() {
        // Создаем дверь
        const door = document.createElement('div');
        door.id = 'mysticalDoor';
        door.style.cssText = `
            width: 300px;
            height: 500px;
            background: linear-gradient(45deg, #8B4513, #A0522D);
            border: 8px solid #654321;
            border-radius: 15px;
            position: relative;
            cursor: pointer;
            transition: all 0.8s ease;
            box-shadow: 
                0 0 30px rgba(0,0,0,0.5),
                inset 0 0 20px rgba(255,255,255,0.1);
            transform-style: preserve-3d;
        `;
        
        // Создаем ручку двери
        const doorHandle = document.createElement('div');
        doorHandle.style.cssText = `
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #FFD700, #FFA500);
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(255,215,0,0.8);
            transition: all 0.3s ease;
        `;
        
        // Создаем портал внутри двери
        const portal = document.createElement('div');
        portal.style.cssText = `
            position: absolute;
            top: 50px;
            left: 50px;
            right: 50px;
            bottom: 50px;
            background: radial-gradient(circle, 
                rgba(255,255,255,0.1) 0%, 
                rgba(0,0,0,0.8) 50%, 
                rgba(0,0,0,0.95) 100%);
            border-radius: 10px;
            opacity: 0.7;
            transition: all 1s ease;
            overflow: hidden;
        `;
        
        // Создаем звезды в портале
        const stars = document.createElement('div');
        stars.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
            background-repeat: repeat;
            background-size: 200px 100px;
            animation: twinkle 3s infinite;
        `;
        
        // Создаем инструкцию
        const instruction = document.createElement('div');
        instruction.style.cssText = `
            position: absolute;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-family: 'Arial', sans-serif;
            font-size: 18px;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            opacity: 0.9;
            z-index: 1000;
        `;
        instruction.textContent = 'Нажмите на дверь, чтобы войти в другой мир';
        
        // Добавляем элементы
        portal.appendChild(stars);
        door.appendChild(doorHandle);
        door.appendChild(portal);
        world.appendChild(door);
        world.appendChild(instruction);
        
        // Добавляем обработчики событий
        door.addEventListener('mouseenter', () => {
            door.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1.05)';
            doorHandle.style.transform = 'translateY(-50%) rotate(10deg)';
            portal.style.opacity = '0.9';
        });
        
        door.addEventListener('mouseleave', () => {
            door.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
            doorHandle.style.transform = 'translateY(-50%) rotate(0deg)';
            portal.style.opacity = '0.7';
        });
        
        door.addEventListener('click', openDoor);
        
        // Инициализируем интерактивные элементы магии
        initializeInteractiveMagic();
        
        // Инициализируем многопользовательскую систему
        initializeMultiplayerMagic();
    }
    
    // Глобальные переменные для системы магии
    let magicEnergy = 0;
    let magicLevel = 1;
    let magicExperience = 0;
    let magicStreak = 0;
    let lastMagicTime = 0;
    
    // МНОГОПОЛЬЗОВАТЕЛЬСКАЯ СИСТЕМА МАГИИ
    let playerId = 'player_' + Math.random().toString(36).substr(2, 9);
    let playerName = 'Маг_' + Math.floor(Math.random() * 1000);
    let connectedPlayers = new Map();
    let magicNetwork = {
        isConnected: false,
        serverUrl: 'wss://echo.websocket.org', // Публичный WebSocket сервер для демо
        socket: null,
        reconnectAttempts: 0,
        maxReconnectAttempts: 5
    };
    
    // Симуляция сетевого соединения (для демо)
    let networkSimulation = {
        enabled: true,
        latency: 100, // мс
        packetLoss: 0.05, // 5% потери пакетов
        players: new Map()
    };
    
    // МОБИЛЬНАЯ ОПТИМИЗАЦИЯ
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let mobileUI = {
        enabled: isMobile || isTouchDevice,
        magicButtons: [],
        gestureMagic: {
            enabled: true,
            lastGesture: null,
            gestureStartTime: 0
        }
    };
    
    // Система весовых коэффициентов для эффектов
    const magicEffects = {
        // Обычные эффекты (вес 10)
        common: [
            { effect: () => changeWorldColors(), weight: 10, name: "Изменение цветов мира" },
            { effect: () => createRainbow(), weight: 10, name: "Радуга" },
            { effect: () => spawnFloatingHearts(), weight: 10, name: "Парящие сердца" },
            { effect: () => createLightning(), weight: 10, name: "Молния" },
            { effect: () => summonTreasure(), weight: 10, name: "Сокровища" },
            { effect: () => createMeteorShower(), weight: 10, name: "Метеоритный дождь" },
            { effect: () => spawnMagicButterflies(), weight: 10, name: "Магические бабочки" },
            { effect: () => createAuroraBorealis(), weight: 10, name: "Северное сияние" },
            { effect: () => summonMagicCrystals(), weight: 10, name: "Магические кристаллы" },
            { effect: () => createTornado(), weight: 10, name: "Торнадо" }
        ],
        
        // Редкие эффекты (вес 5)
        rare: [
            { effect: () => spawnFloatingIslands(), weight: 5, name: "Парящие острова" },
            { effect: () => createMagicPortal(), weight: 5, name: "Магический портал" },
            { effect: () => summonDragon(), weight: 5, name: "Дракон" },
            { effect: () => createFireworks(), weight: 5, name: "Фейерверк" },
            { effect: () => spawnMagicFlowers(), weight: 5, name: "Магические цветы" },
            { effect: () => createMagicStorm(), weight: 5, name: "Магический шторм" },
            { effect: () => summonMagicBeasts(), weight: 5, name: "Магические звери" },
            { effect: () => createGalaxy(), weight: 5, name: "Галактика" },
            { effect: () => spawnMagicForest(), weight: 5, name: "Магический лес" },
            { effect: () => createTimeWarp(), weight: 5, name: "Искажение времени" }
        ],
        
        // Эпические эффекты (вес 2)
        epic: [
            { effect: () => summonElementals(), weight: 2, name: "Элементали" },
            { effect: () => createMagicOcean(), weight: 2, name: "Магический океан" },
            { effect: () => spawnCosmicBeings(), weight: 2, name: "Космические существа" },
            { effect: () => createDimensionRift(), weight: 2, name: "Разрыв измерений" },
            { effect: () => summonPhoenix(), weight: 2, name: "Феникс" },
            { effect: () => createMagicMountain(), weight: 2, name: "Магическая гора" },
            { effect: () => spawnStardust(), weight: 2, name: "Звездная пыль" },
            { effect: () => createMagicCity(), weight: 2, name: "Магический город" },
            { effect: () => summonAncientSpirits(), weight: 2, name: "Древние духи" },
            { effect: () => createEpicBattle(), weight: 2, name: "Эпическая битва" }
        ],
        
        // Легендарные эффекты (вес 1)
        legendary: [
            { effect: () => createRealityBend(), weight: 1, name: "Искажение реальности" },
            { effect: () => summonMegaBeast(), weight: 1, name: "Мега-зверь" },
            { effect: () => createInfiniteMagic(), weight: 1, name: "Бесконечная магия" },
            { effect: () => createChaosRealm(), weight: 1, name: "Царство хаоса" },
            { effect: () => spawnUniverse(), weight: 1, name: "Вселенная" },
            { effect: () => createTimeParadox(), weight: 1, name: "Временной парадокс" },
            { effect: () => summonGods(), weight: 1, name: "Боги" },
            { effect: () => createMultiverse(), weight: 1, name: "Мультивселенная" },
            { effect: () => spawnRealityBreaker(), weight: 1, name: "Разрушитель реальности" },
            { effect: () => createMagicApocalypse(), weight: 1, name: "Магический апокалипсис" }
        ],
        
        // Элементальные эффекты (вес 7)
        elemental: [
            { effect: () => createFireStorm(), weight: 7, name: "Огненный шторм" },
            { effect: () => createWaterWhirlpool(), weight: 7, name: "Водоворот" },
            { effect: () => createEarthquake(), weight: 7, name: "Землетрясение" },
            { effect: () => createWindTornado(), weight: 7, name: "Ветряной торнадо" },
            { effect: () => createIceAge(), weight: 7, name: "Ледниковый период" },
            { effect: () => createThunderStorm(), weight: 7, name: "Грозовой шторм" }
        ],
        
        // Космические эффекты (вес 6)
        cosmic: [
            { effect: () => createBlackHole(), weight: 6, name: "Черная дыра" },
            { effect: () => createNebula(), weight: 6, name: "Туманность" },
            { effect: () => createSupernova(), weight: 6, name: "Сверхновая" },
            { effect: () => createSolarFlare(), weight: 6, name: "Солнечная вспышка" },
            { effect: () => createAsteroidBelt(), weight: 6, name: "Пояс астероидов" },
            { effect: () => createWormhole(), weight: 6, name: "Кротовая нора" }
        ],
        
        // Временные эффекты (вес 5)
        temporal: [
            { effect: () => createTimeStop(), weight: 5, name: "Остановка времени" },
            { effect: () => createTimeAcceleration(), weight: 5, name: "Ускорение времени" },
            { effect: () => createTimeReversal(), weight: 5, name: "Обращение времени" },
            { effect: () => createTimeLoop(), weight: 5, name: "Временная петля" },
            { effect: () => createTimeFracture(), weight: 5, name: "Разлом времени" },
            { effect: () => createTemporalStorm(), weight: 5, name: "Временной шторм" }
        ],
        
        // Психические эффекты (вес 4)
        psychic: [
            { effect: () => createMindControl(), weight: 4, name: "Контроль разума" },
            { effect: () => createTelepathy(), weight: 4, name: "Телепатия" },
            { effect: () => createIllusion(), weight: 4, name: "Иллюзия" },
            { effect: () => createMemoryWipe(), weight: 4, name: "Стирание памяти" },
            { effect: () => createPsychicStorm(), weight: 4, name: "Психический шторм" },
            { effect: () => createDreamRealm(), weight: 4, name: "Царство снов" }
        ],
        
        // Природные эффекты (вес 8)
        nature: [
            { effect: () => createFlowerBloom(), weight: 8, name: "Цветение" },
            { effect: () => createTreeGrowth(), weight: 8, name: "Рост деревьев" },
            { effect: () => createAnimalSummon(), weight: 8, name: "Призыв животных" },
            { effect: () => createWeatherControl(), weight: 8, name: "Контроль погоды" },
            { effect: () => createSeasonChange(), weight: 8, name: "Смена сезонов" },
            { effect: () => createNatureSpirits(), weight: 8, name: "Духи природы" }
        ],
        
        // Хаотические эффекты (вес 3)
        chaos: [
            { effect: () => createRealityGlitch(), weight: 3, name: "Глитч реальности" },
            { effect: () => createDimensionRift(), weight: 3, name: "Разрыв измерений" },
            { effect: () => createQuantumFoam(), weight: 3, name: "Квантовая пена" },
            { effect: () => createProbabilityStorm(), weight: 3, name: "Шторм вероятностей" },
            { effect: () => createChaosVortex(), weight: 3, name: "Вихрь хаоса" },
            { effect: () => createRealityBreak(), weight: 3, name: "Разлом реальности" }
        ],
        
        // Ультимативные эффекты (вес 0.5)
        ultimate: [
            { effect: () => createUniverseCreation(), weight: 0.5, name: "Создание вселенной" },
            { effect: () => createGodMode(), weight: 0.5, name: "Режим бога" },
            { effect: () => createInfinitePower(), weight: 0.5, name: "Бесконечная сила" },
            { effect: () => createOmnipotence(), weight: 0.5, name: "Всемогущество" },
            { effect: () => createAbsoluteReality(), weight: 0.5, name: "Абсолютная реальность" },
            { effect: () => createMagicSingularity(), weight: 0.5, name: "Магическая сингулярность" }
        ]
    };
    
    // Функция магического действия с улучшенной системой случайности
    function performMagic() {
        const currentTime = Date.now();
        const timeSinceLastMagic = currentTime - lastMagicTime;
        
        // Увеличиваем энергию и опыт
        magicEnergy += 10 + Math.floor(Math.random() * 20);
        magicExperience += 5 + Math.floor(Math.random() * 10);
        magicStreak++;
        
        // Проверяем повышение уровня
        if (magicExperience >= magicLevel * 100) {
            magicLevel++;
            magicExperience = 0;
            createLevelUpEffect();
        }
        
        // Создаем взрыв частиц
        createMagicExplosion();
        
        // Выбираем эффект с учетом весов и уровня
        const selectedEffect = selectWeightedMagicEffect();
        selectedEffect.effect();
        
        // Показываем информацию об эффекте
        showMagicInfo(selectedEffect.name);
        
        // Отправляем магию другим игрокам
        sendMagicToPlayers(selectedEffect);
        
        // Добавляем эффект в историю для комбинаций
        magicHistory.push(selectedEffect);
        if (magicHistory.length > maxHistorySize) {
            magicHistory.shift();
        }
        
        // Проверяем комбинации
        checkMagicCombinations();
        
        // Цепочки эффектов (30% шанс)
        if (Math.random() < 0.3) {
            setTimeout(() => {
                const chainEffect = selectWeightedMagicEffect();
                chainEffect.effect();
                showMagicInfo(`Цепочка: ${chainEffect.name}`);
            }, 1500 + Math.random() * 1000);
        }
        
        // Тройная цепочка (5% шанс)
        if (Math.random() < 0.05) {
            setTimeout(() => {
                const thirdEffect = selectWeightedMagicEffect();
                thirdEffect.effect();
                showMagicInfo(`Тройная цепочка: ${thirdEffect.name}`);
            }, 3000 + Math.random() * 1000);
        }
        
        // Синергия эффектов (15% шанс)
        if (Math.random() < 0.15) {
            setTimeout(() => {
                createSynergyEffect();
            }, 2000);
        }
        
        lastMagicTime = currentTime;
        
        // Показываем сообщение о результате
        showMagicResult();
        
        // Обновляем UI
        updateMagicUI();
    }
    
    // Интерактивные элементы магии
    
    // Создание магического следа за курсором
    function createMagicCursorTrail() {
        let mouseX = 0, mouseY = 0;
        let trailParticles = [];
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Создаем частицы следа
            if (Math.random() < 0.3) {
                createCursorParticle(mouseX, mouseY);
            }
        });
        
        // Создаем частицу следа
        function createCursorParticle(x, y) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #FFD700, #FFA500);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 9999;
                animation: cursorTrailAnimation 1s ease-out forwards;
                box-shadow: 0 0 10px #FFD700;
            `;
            
            document.body.appendChild(particle);
            trailParticles.push(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
                trailParticles = trailParticles.filter(p => p !== particle);
            }, 1000);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('cursorTrailAnimation')) {
            const style = document.createElement('style');
            style.id = 'cursorTrailAnimation';
            style.textContent = `
                @keyframes cursorTrailAnimation {
                    0% { 
                        opacity: 1; 
                        transform: scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0) translateY(-20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Магическая реакция на клики
    function createMagicClickReaction() {
        document.addEventListener('click', (e) => {
            // Создаем магический взрыв в месте клика
            createClickExplosion(e.clientX, e.clientY);
            
            // Иногда запускаем случайный эффект
            if (Math.random() < 0.1) {
                setTimeout(() => {
                    const randomEffect = selectWeightedMagicEffect();
                    randomEffect.effect();
                    showMagicInfo(`Клик-магия: ${randomEffect.name}`);
                }, 500);
            }
        });
        
        function createClickExplosion(x, y) {
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: radial-gradient(circle, #FF69B4, #FF1493);
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    z-index: 9999;
                    animation: clickExplosionAnimation 1.5s ease-out forwards;
                    box-shadow: 0 0 15px #FF69B4;
                `;
                
                const angle = (i / 15) * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const endX = Math.cos(angle) * distance;
                const endY = Math.sin(angle) * distance;
                
                particle.style.setProperty('--endX', endX + 'px');
                particle.style.setProperty('--endY', endY + 'px');
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1500);
            }
            
            // Добавляем CSS анимацию
            if (!document.getElementById('clickExplosionAnimation')) {
                const style = document.createElement('style');
                style.id = 'clickExplosionAnimation';
                style.textContent = `
                    @keyframes clickExplosionAnimation {
                        0% { 
                            opacity: 1; 
                            transform: scale(1);
                        }
                        100% { 
                            opacity: 0; 
                            transform: translate(var(--endX), var(--endY)) scale(0);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    // Магическая реакция на клавиши
    function createMagicKeyboardReaction() {
        const magicKeys = {
            // Элементальные
            'f': () => createFireStorm(),
            'w': () => createWaterWhirlpool(),
            'e': () => createEarthquake(),
            'a': () => createWindTornado(),
            'i': () => createIceAge(),
            't': () => createThunderStorm(),
            
            // Космические
            'b': () => createBlackHole(),
            'n': () => createNebula(),
            's': () => createSupernova(),
            'o': () => createSolarFlare(),
            'k': () => createAsteroidBelt(),
            'h': () => createWormhole(),
            
            // Временные
            '1': () => createTimeStop(),
            '2': () => createTimeAcceleration(),
            '3': () => createTimeReversal(),
            '4': () => createTimeLoop(),
            '5': () => createTimeFracture(),
            '6': () => createTemporalStorm(),
            
            // Классические
            'r': () => createRainbow(),
            'l': () => createLightning(),
            'space': () => performMagic(),
            
            // РЕЖИМ ХАОСА!
            'c': () => createChaosMode(),
            'x': () => createUltimateChaosMode()
        };
        
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            
            if (magicKeys[key]) {
                e.preventDefault();
                magicKeys[key]();
                showMagicInfo(`Быстрое заклинание: ${key.toUpperCase()}`);
                
                // Отправляем магию другим игрокам для клавиатурных заклинаний
                if (key !== 'c' && key !== 'x' && key !== 'space') {
                    const effectName = getEffectNameByKey(key);
                    if (effectName) {
                        sendMagicToPlayers({ name: effectName });
                    }
                }
                
                // Создаем визуальную обратную связь
                createKeyPressEffect();
            }
        });
        
        function createKeyPressEffect() {
            const effect = document.createElement('div');
            effect.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100px;
                height: 100px;
                border: 3px solid #00FFFF;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: keyPressEffect 0.5s ease-out forwards;
                box-shadow: 0 0 30px #00FFFF;
            `;
            
            document.body.appendChild(effect);
            
            setTimeout(() => {
                if (effect.parentNode) {
                    effect.parentNode.removeChild(effect);
                }
            }, 500);
            
            // Добавляем CSS анимацию
            if (!document.getElementById('keyPressEffectAnimation')) {
                const style = document.createElement('style');
                style.id = 'keyPressEffectAnimation';
                style.textContent = `
                    @keyframes keyPressEffect {
                        0% { 
                            opacity: 1; 
                            transform: translate(-50%, -50%) scale(0);
                        }
                        50% { 
                            opacity: 1; 
                            transform: translate(-50%, -50%) scale(1.5);
                        }
                        100% { 
                            opacity: 0; 
                            transform: translate(-50%, -50%) scale(3);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    // Функция для получения названия эффекта по клавише
    function getEffectNameByKey(key) {
        const keyToEffectMap = {
            'f': 'Огненный шторм',
            'w': 'Водоворот',
            'e': 'Землетрясение',
            'a': 'Ветряной торнадо',
            'i': 'Ледниковый период',
            't': 'Грозовой шторм',
            'b': 'Черная дыра',
            'n': 'Туманность',
            's': 'Сверхновая',
            'o': 'Солнечная вспышка',
            'k': 'Пояс астероидов',
            'h': 'Кротовая нора',
            '1': 'Остановка времени',
            '2': 'Ускорение времени',
            '3': 'Обращение времени',
            '4': 'Временная петля',
            '5': 'Разлом времени',
            '6': 'Временной шторм',
            'r': 'Радуга',
            'l': 'Молния'
        };
        
        return keyToEffectMap[key] || null;
    }
    
    // Инициализация интерактивных элементов
    function initializeInteractiveMagic() {
        createMagicCursorTrail();
        createMagicClickReaction();
        createMagicKeyboardReaction();
        
        // Показываем подсказки
        showMagicTips();
    }
    
    // Показ подсказок по управлению
    function showMagicTips() {
        const tipsDiv = document.createElement('div');
        tipsDiv.id = 'magicTips';
        tipsDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 11px;
            z-index: 9999;
            border: 2px solid #00FFFF;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            max-width: 250px;
            animation: tipsAnimation 10s ease-in-out infinite;
        `;
        
        tipsDiv.innerHTML = `
            <div style="color: #00FFFF; font-weight: bold; margin-bottom: 10px;">🎮 УПРАВЛЕНИЕ МАГИЕЙ</div>
            <div style="color: #FF4500; font-weight: bold;">🔥 ЭЛЕМЕНТАЛЬНЫЕ:</div>
            <div>• F - Огненный шторм</div>
            <div>• W - Водоворот</div>
            <div>• E - Землетрясение</div>
            <div>• A - Ветряной торнадо</div>
            <div>• I - Ледниковый период</div>
            <div>• T - Грозовой шторм</div>
            <div style="color: #8A2BE2; font-weight: bold;">🌌 КОСМИЧЕСКИЕ:</div>
            <div>• B - Черная дыра</div>
            <div>• N - Туманность</div>
            <div>• S - Сверхновая</div>
            <div>• O - Солнечная вспышка</div>
            <div>• K - Пояс астероидов</div>
            <div>• H - Кротовая нора</div>
            <div style="color: #00FFFF; font-weight: bold;">⏰ ВРЕМЕННЫЕ:</div>
            <div>• 1 - Остановка времени</div>
            <div>• 2 - Ускорение времени</div>
            <div>• 3 - Обращение времени</div>
            <div>• 4 - Временная петля</div>
            <div>• 5 - Разлом времени</div>
            <div>• 6 - Временной шторм</div>
            <div style="color: #FFD700; font-weight: bold;">✨ КЛАССИЧЕСКИЕ:</div>
            <div>• R - Радуга</div>
            <div>• L - Молния</div>
            <div>• ПРОБЕЛ - Случайная магия</div>
            <div style="color: #FF0000; font-weight: bold;">💀 РЕЖИМЫ ХАОСА:</div>
            <div>• C - Режим хаоса</div>
            <div>• X - Ультимативный хаос</div>
            <div style="color: #8A2BE2; font-weight: bold;">🔍 ПОИСК И ПОРТАЛЫ:</div>
            <div>• P - Пробить дыру в реальности</div>
            <div>• Клик по точке на радаре - портал к магу</div>
            <div style="margin-top: 10px; color: #FFD700;">
                Двигайте мышью для магического следа!
            </div>
        `;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('tipsAnimation')) {
            const style = document.createElement('style');
            style.id = 'tipsAnimation';
            style.textContent = `
                @keyframes tipsAnimation {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(tipsDiv);
        
        // Скрываем подсказки через 15 секунд
        setTimeout(() => {
            if (tipsDiv.parentNode) {
                tipsDiv.style.animation = 'tipsFadeOut 2s ease-out forwards';
                setTimeout(() => {
                    if (tipsDiv.parentNode) {
                        tipsDiv.parentNode.removeChild(tipsDiv);
                    }
                }, 2000);
            }
        }, 15000);
        
        // Добавляем CSS анимацию исчезновения
        if (!document.getElementById('tipsFadeOutAnimation')) {
            const style = document.createElement('style');
            style.id = 'tipsFadeOutAnimation';
            style.textContent = `
                @keyframes tipsFadeOut {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Система комбинирования магии
    
    // История использованных эффектов
    let magicHistory = [];
    const maxHistorySize = 10;
    
    // Комбинации магии
    const magicCombinations = {
        // Элементальные комбинации
        'fire_water': {
            name: "Паровая буря",
            effects: ['fire', 'water'],
            result: () => createSteamStorm(),
            description: "Огонь и вода создают мощную паровую бурю"
        },
        'fire_earth': {
            name: "Вулканический взрыв",
            effects: ['fire', 'earth'],
            result: () => createVolcanicEruption(),
            description: "Огонь и земля порождают вулканический взрыв"
        },
        'water_earth': {
            name: "Грязевая лавина",
            effects: ['water', 'earth'],
            result: () => createMudAvalanche(),
            description: "Вода и земля создают грязевую лавину"
        },
        'air_water': {
            name: "Ураган",
            effects: ['air', 'water'],
            result: () => createHurricane(),
            description: "Воздух и вода объединяются в ураган"
        },
        'fire_air': {
            name: "Огненный смерч",
            effects: ['fire', 'air'],
            result: () => createFireTornado(),
            description: "Огонь и воздух создают огненный смерч"
        },
        'earth_air': {
            name: "Песчаная буря",
            effects: ['earth', 'air'],
            result: () => createSandstorm(),
            description: "Земля и воздух порождают песчаную бурю"
        },
        
        // Тройные комбинации
        'fire_water_air': {
            name: "Стихийный хаос",
            effects: ['fire', 'water', 'air'],
            result: () => createElementalChaos(),
            description: "Три стихии создают хаотический шторм"
        },
        'all_elements': {
            name: "Великая стихия",
            effects: ['fire', 'water', 'earth', 'air'],
            result: () => createGreatElement(),
            description: "Все четыре стихии объединяются в великую силу"
        }
    };
    
    // Функция для определения типа эффекта
    function getEffectType(effectName) {
        const typeMap = {
            'Огненный шторм': 'fire',
            'Водоворот': 'water',
            'Землетрясение': 'earth',
            'Ветряной торнадо': 'air',
            'Ледниковый период': 'ice',
            'Грозовой шторм': 'thunder'
        };
        return typeMap[effectName] || 'unknown';
    }
    
    // Проверка комбинаций
    function checkMagicCombinations() {
        if (magicHistory.length < 2) return;
        
        const recentEffects = magicHistory.slice(-4); // Последние 4 эффекта
        const effectTypes = recentEffects.map(effect => getEffectType(effect.name));
        
        // Проверяем все возможные комбинации
        for (const [key, combination] of Object.entries(magicCombinations)) {
            if (isCombinationMatch(effectTypes, combination.effects)) {
                triggerMagicCombination(combination);
                return true;
            }
        }
        
        return false;
    }
    
    // Проверка соответствия комбинации
    function isCombinationMatch(effectTypes, requiredEffects) {
        const requiredCount = requiredEffects.length;
        if (effectTypes.length < requiredCount) return false;
        
        const recentTypes = effectTypes.slice(-requiredCount);
        return requiredEffects.every(effect => recentTypes.includes(effect));
    }
    
    // Активация комбинации
    function triggerMagicCombination(combination) {
        showMagicInfo(`КОМБИНАЦИЯ: ${combination.name}!`);
        
        // Создаем эффект комбинации
        combination.result();
        
        // Дополнительные бонусы
        magicEnergy += 50;
        magicExperience += 25;
        
        // Очищаем историю после успешной комбинации
        magicHistory = [];
        
        // Показываем описание
        setTimeout(() => {
            showMagicInfo(combination.description);
        }, 2000);
    }
    
    // Новые комбинированные эффекты
    
    // Паровая буря
    function createSteamStorm() {
        const steamContainer = document.createElement('div');
        steamContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(180deg, 
                rgba(200, 200, 200, 0.3) 0%, 
                rgba(150, 150, 150, 0.5) 50%, 
                rgba(100, 100, 100, 0.7) 100%);
        `;
        
        // Создаем паровые частицы
        for (let i = 0; i < 80; i++) {
            const steamParticle = document.createElement('div');
            steamParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 30 + 10}px;
                height: ${Math.random() * 30 + 10}px;
                background: radial-gradient(circle, 
                    rgba(255, 255, 255, 0.8), 
                    rgba(200, 200, 200, 0.4), 
                    rgba(150, 150, 150, 0.2));
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: steamParticleAnimation ${Math.random() * 4 + 3}s ease-out forwards;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
            `;
            
            steamContainer.appendChild(steamParticle);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('steamParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'steamParticleAnimation';
            style.textContent = `
                @keyframes steamParticleAnimation {
                    0% { 
                        opacity: 0; 
                        transform: scale(0) translateY(0px);
                    }
                    30% { 
                        opacity: 1; 
                        transform: scale(1) translateY(-50px);
                    }
                    70% { 
                        opacity: 1; 
                        transform: scale(1.5) translateY(-100px);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(2) translateY(-200px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(steamContainer);
        
        setTimeout(() => {
            if (steamContainer.parentNode) {
                steamContainer.parentNode.removeChild(steamContainer);
            }
        }, 7000);
    }
    
    // Вулканический взрыв
    function createVolcanicEruption() {
        const volcanoContainer = document.createElement('div');
        volcanoContainer.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 300px;
            pointer-events: none;
            z-index: 9998;
        `;
        
        // Создаем вулкан
        const volcano = document.createElement('div');
        volcano.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 200px;
            background: linear-gradient(45deg, #8B4513, #654321, #8B4513);
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            animation: volcanoEruption 4s ease-out forwards;
        `;
        
        volcanoContainer.appendChild(volcano);
        
        // Создаем лаву
        for (let i = 0; i < 60; i++) {
            const lavaParticle = document.createElement('div');
            lavaParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 15 + 5}px;
                height: ${Math.random() * 15 + 5}px;
                background: radial-gradient(circle, #FF4500, #FF0000, #8B0000);
                border-radius: 50%;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                animation: lavaParticleAnimation ${Math.random() * 3 + 2}s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 15px #FF4500;
            `;
            
            volcanoContainer.appendChild(lavaParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('volcanoAnimation')) {
            const style = document.createElement('style');
            style.id = 'volcanoAnimation';
            style.textContent = `
                @keyframes volcanoEruption {
                    0% { 
                        transform: translateX(-50%) scale(0);
                        opacity: 0;
                    }
                    50% { 
                        transform: translateX(-50%) scale(1.2);
                        opacity: 1;
                    }
                    100% { 
                        transform: translateX(-50%) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes lavaParticleAnimation {
                    0% { 
                        opacity: 1; 
                        transform: translateX(-50%) translateY(0px) scale(1);
                    }
                    50% { 
                        opacity: 1; 
                        transform: translateX(-50%) translateY(-100px) scale(1.2);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateX(-50%) translateY(-200px) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(volcanoContainer);
        
        setTimeout(() => {
            if (volcanoContainer.parentNode) {
                volcanoContainer.parentNode.removeChild(volcanoContainer);
            }
        }, 6000);
    }
    
    // Грязевая лавина
    function createMudAvalanche() {
        const mudContainer = document.createElement('div');
        mudContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
        `;
        
        // Создаем грязевые потоки
        for (let i = 0; i < 20; i++) {
            const mudStream = document.createElement('div');
            mudStream.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: 20px;
                background: linear-gradient(90deg, #8B4513, #654321, #8B4513);
                left: ${Math.random() * 100}%;
                top: -20px;
                animation: mudStreamAnimation ${Math.random() * 3 + 2}s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                border-radius: 10px;
                box-shadow: 0 0 15px #654321;
            `;
            
            mudContainer.appendChild(mudStream);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('mudStreamAnimation')) {
            const style = document.createElement('style');
            style.id = 'mudStreamAnimation';
            style.textContent = `
                @keyframes mudStreamAnimation {
                    0% { 
                        transform: translateY(0px);
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(100vh);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(mudContainer);
        
        setTimeout(() => {
            if (mudContainer.parentNode) {
                mudContainer.parentNode.removeChild(mudContainer);
            }
        }, 5000);
    }
    
    // Ураган
    function createHurricane() {
        const hurricaneContainer = document.createElement('div');
        hurricaneContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            pointer-events: none;
            z-index: 9998;
            animation: hurricaneAnimation 6s ease-out forwards;
        `;
        
        // Создаем спиральные частицы
        for (let i = 0; i < 100; i++) {
            const hurricaneParticle = document.createElement('div');
            hurricaneParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 2}px;
                height: ${Math.random() * 8 + 2}px;
                background: radial-gradient(circle, 
                    rgba(135, 206, 235, 0.8), 
                    rgba(70, 130, 180, 0.4));
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: hurricaneParticleAnimation ${Math.random() * 4 + 3}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            
            hurricaneContainer.appendChild(hurricaneParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('hurricaneAnimation')) {
            const style = document.createElement('style');
            style.id = 'hurricaneAnimation';
            style.textContent = `
                @keyframes hurricaneAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(2) rotate(360deg);
                    }
                }
                @keyframes hurricaneParticleAnimation {
                    0% { 
                        transform: translate(-50%, -50%) rotate(0deg) translateX(0px);
                        opacity: 0;
                    }
                    25% { 
                        opacity: 1;
                    }
                    75% { 
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(360deg) translateX(200px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(hurricaneContainer);
        
        setTimeout(() => {
            if (hurricaneContainer.parentNode) {
                hurricaneContainer.parentNode.removeChild(hurricaneContainer);
            }
        }, 6000);
    }
    
    // Огненный смерч
    function createFireTornado() {
        const fireTornadoContainer = document.createElement('div');
        fireTornadoContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
            height: 500px;
            pointer-events: none;
            z-index: 9998;
            animation: fireTornadoAnimation 5s ease-out forwards;
        `;
        
        // Создаем огненные частицы
        for (let i = 0; i < 120; i++) {
            const fireParticle = document.createElement('div');
            fireParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 12 + 3}px;
                height: ${Math.random() * 12 + 3}px;
                background: radial-gradient(circle, #FF4500, #FF0000, #8B0000);
                border-radius: 50%;
                left: 50%;
                top: ${Math.random() * 100}%;
                transform: translate(-50%, -50%);
                animation: fireTornadoParticleAnimation ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 15px #FF4500;
            `;
            
            fireTornadoContainer.appendChild(fireParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('fireTornadoAnimation')) {
            const style = document.createElement('style');
            style.id = 'fireTornadoAnimation';
            style.textContent = `
                @keyframes fireTornadoAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(2) rotate(360deg);
                    }
                }
                @keyframes fireTornadoParticleAnimation {
                    0% { 
                        transform: translate(-50%, -50%) rotate(0deg) translateX(0px);
                        opacity: 0;
                    }
                    25% { 
                        opacity: 1;
                    }
                    75% { 
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(360deg) translateX(75px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(fireTornadoContainer);
        
        setTimeout(() => {
            if (fireTornadoContainer.parentNode) {
                fireTornadoContainer.parentNode.removeChild(fireTornadoContainer);
            }
        }, 5000);
    }
    
    // Песчаная буря
    function createSandstorm() {
        const sandContainer = document.createElement('div');
        sandContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(180deg, 
                rgba(238, 203, 173, 0.2) 0%, 
                rgba(210, 180, 140, 0.4) 50%, 
                rgba(160, 82, 45, 0.6) 100%);
        `;
        
        // Создаем песчаные частицы
        for (let i = 0; i < 150; i++) {
            const sandParticle = document.createElement('div');
            sandParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: radial-gradient(circle, #F4A460, #D2B48C, #A0522D);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: -10px;
                animation: sandParticleAnimation ${Math.random() * 4 + 2}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            
            sandContainer.appendChild(sandParticle);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('sandParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'sandParticleAnimation';
            style.textContent = `
                @keyframes sandParticleAnimation {
                    0% { 
                        transform: translateY(0px) translateX(0px);
                        opacity: 0;
                    }
                    10% { 
                        opacity: 1;
                    }
                    90% { 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(sandContainer);
        
        setTimeout(() => {
            if (sandContainer.parentNode) {
                sandContainer.parentNode.removeChild(sandContainer);
            }
        }, 6000);
    }
    
    // Стихийный хаос
    function createElementalChaos() {
        const chaosContainer = document.createElement('div');
        chaosContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(45deg, 
                rgba(255, 69, 0, 0.2), 
                rgba(0, 191, 255, 0.2), 
                rgba(255, 255, 255, 0.2), 
                rgba(255, 69, 0, 0.2));
        `;
        
        // Создаем хаотические частицы
        for (let i = 0; i < 200; i++) {
            const chaosParticle = document.createElement('div');
            const colors = ['#FF4500', '#00BFFF', '#FFFFFF', '#32CD32'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            chaosParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 15 + 5}px;
                height: ${Math.random() * 15 + 5}px;
                background: radial-gradient(circle, ${randomColor}, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: chaosParticleAnimation ${Math.random() * 5 + 3}s ease-out forwards;
                box-shadow: 0 0 20px ${randomColor};
            `;
            
            chaosContainer.appendChild(chaosParticle);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('chaosParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'chaosParticleAnimation';
            style.textContent = `
                @keyframes chaosParticleAnimation {
                    0% { 
                        opacity: 0; 
                        transform: scale(0) rotate(0deg);
                    }
                    25% { 
                        opacity: 1; 
                        transform: scale(1.5) rotate(90deg);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(0.8) rotate(180deg);
                    }
                    75% { 
                        opacity: 1; 
                        transform: scale(1.2) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(chaosContainer);
        
        setTimeout(() => {
            if (chaosContainer.parentNode) {
                chaosContainer.parentNode.removeChild(chaosContainer);
            }
        }, 8000);
    }
    
    // Великая стихия
    function createGreatElement() {
        const greatElementContainer = document.createElement('div');
        greatElementContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 500px;
            pointer-events: none;
            z-index: 9998;
            animation: greatElementAnimation 8s ease-out forwards;
        `;
        
        // Создаем центральный элемент
        const centralElement = document.createElement('div');
        centralElement.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, 
                #FFD700, #FF4500, #00BFFF, #32CD32, #FFD700);
            border-radius: 50%;
            animation: centralElementAnimation 2s ease-in-out infinite;
            box-shadow: 0 0 50px #FFD700;
        `;
        
        greatElementContainer.appendChild(centralElement);
        
        // Создаем орбитальные элементы
        for (let i = 0; i < 4; i++) {
            const orbitalElement = document.createElement('div');
            const colors = ['#FF4500', '#00BFFF', '#32CD32', '#FFFFFF'];
            const color = colors[i];
            
            orbitalElement.style.cssText = `
                position: absolute;
                width: 50px;
                height: 50px;
                background: radial-gradient(circle, ${color}, transparent);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: orbitalElementAnimation 3s linear infinite;
                animation-delay: ${i * 0.75}s;
                box-shadow: 0 0 25px ${color};
            `;
            
            orbitalElement.style.setProperty('--orbit-radius', (150 + i * 50) + 'px');
            orbitalElement.style.setProperty('--orbit-angle', (i * 90) + 'deg');
            
            greatElementContainer.appendChild(orbitalElement);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('greatElementAnimation')) {
            const style = document.createElement('style');
            style.id = 'greatElementAnimation';
            style.textContent = `
                @keyframes greatElementAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.2) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(2) rotate(360deg);
                    }
                }
                @keyframes centralElementAnimation {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.3) rotate(180deg);
                    }
                }
                @keyframes orbitalElementAnimation {
                    0% { 
                        transform: translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle)));
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(calc(var(--orbit-angle) + 360deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle) - 360deg));
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(greatElementContainer);
        
        setTimeout(() => {
            if (greatElementContainer.parentNode) {
                greatElementContainer.parentNode.removeChild(greatElementContainer);
            }
        }, 8000);
    }
    
    // НОВЫЕ КАТЕГОРИИ МАГИИ - КОСМИЧЕСКИЕ ЭФФЕКТЫ
    
    // Черная дыра
    function createBlackHole() {
        const blackHoleContainer = document.createElement('div');
        blackHoleContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            pointer-events: none;
            z-index: 9998;
            animation: blackHoleAnimation 8s ease-out forwards;
        `;
        
        // Создаем черную дыру
        const blackHole = document.createElement('div');
        blackHole.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #000000, #1a1a1a, #000000);
            border-radius: 50%;
            animation: blackHoleCore 2s ease-in-out infinite;
            box-shadow: 0 0 50px #000000, inset 0 0 30px #1a1a1a;
        `;
        
        blackHoleContainer.appendChild(blackHole);
        
        // Создаем аккреционный диск
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, #FF4500, #FF0000, #8B0000);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: accretionDisk ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 10px #FF4500;
            `;
            
            particle.style.setProperty('--orbit-radius', (60 + Math.random() * 80) + 'px');
            particle.style.setProperty('--orbit-angle', (Math.random() * 360) + 'deg');
            
            blackHoleContainer.appendChild(particle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('blackHoleAnimation')) {
            const style = document.createElement('style');
            style.id = 'blackHoleAnimation';
            style.textContent = `
                @keyframes blackHoleAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(2) rotate(360deg);
                    }
                }
                @keyframes blackHoleCore {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                }
                @keyframes accretionDisk {
                    0% { 
                        transform: translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle)));
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(calc(var(--orbit-angle) + 360deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle) - 360deg));
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(blackHoleContainer);
        
        setTimeout(() => {
            if (blackHoleContainer.parentNode) {
                blackHoleContainer.parentNode.removeChild(blackHoleContainer);
            }
        }, 8000);
    }
    
    // Туманность
    function createNebula() {
        const nebulaContainer = document.createElement('div');
        nebulaContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: radial-gradient(ellipse at center, 
                rgba(138, 43, 226, 0.3) 0%, 
                rgba(75, 0, 130, 0.4) 30%, 
                rgba(25, 25, 112, 0.5) 60%, 
                rgba(0, 0, 0, 0.8) 100%);
        `;
        
        // Создаем звезды в туманности
        for (let i = 0; i < 200; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: radial-gradient(circle, #FFFFFF, #87CEEB, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: nebulaStar ${Math.random() * 5 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
                box-shadow: 0 0 10px #FFFFFF;
            `;
            
            nebulaContainer.appendChild(star);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('nebulaStarAnimation')) {
            const style = document.createElement('style');
            style.id = 'nebulaStarAnimation';
            style.textContent = `
                @keyframes nebulaStar {
                    0%, 100% { 
                        opacity: 0.3; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(nebulaContainer);
        
        setTimeout(() => {
            if (nebulaContainer.parentNode) {
                nebulaContainer.parentNode.removeChild(nebulaContainer);
            }
        }, 10000);
    }
    
    // Сверхновая
    function createSupernova() {
        const supernovaContainer = document.createElement('div');
        supernovaContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            pointer-events: none;
            z-index: 9998;
            animation: supernovaAnimation 6s ease-out forwards;
        `;
        
        // Создаем взрыв сверхновой
        for (let i = 0; i < 300; i++) {
            const explosionParticle = document.createElement('div');
            explosionParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 2}px;
                height: ${Math.random() * 8 + 2}px;
                background: radial-gradient(circle, #FFD700, #FF4500, #FF0000);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: supernovaParticle ${Math.random() * 4 + 2}s ease-out forwards;
                animation-delay: ${Math.random() * 1}s;
                box-shadow: 0 0 15px #FFD700;
            `;
            
            const angle = (i / 300) * Math.PI * 2;
            const distance = 50 + Math.random() * 250;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            explosionParticle.style.setProperty('--endX', endX + 'px');
            explosionParticle.style.setProperty('--endY', endY + 'px');
            
            supernovaContainer.appendChild(explosionParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('supernovaAnimation')) {
            const style = document.createElement('style');
            style.id = 'supernovaAnimation';
            style.textContent = `
                @keyframes supernovaAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.5);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(2);
                    }
                }
                @keyframes supernovaParticle {
                    0% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(0);
                    }
                    30% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(supernovaContainer);
        
        setTimeout(() => {
            if (supernovaContainer.parentNode) {
                supernovaContainer.parentNode.removeChild(supernovaContainer);
            }
        }, 6000);
    }
    
    // Солнечная вспышка
    function createSolarFlare() {
        const flareContainer = document.createElement('div');
        flareContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(45deg, 
                rgba(255, 215, 0, 0.3) 0%, 
                rgba(255, 165, 0, 0.4) 50%, 
                rgba(255, 69, 0, 0.5) 100%);
        `;
        
        // Создаем солнечные вспышки
        for (let i = 0; i < 20; i++) {
            const flare = document.createElement('div');
            flare.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: 4px;
                background: linear-gradient(90deg, transparent, #FFD700, #FF4500, #FFD700, transparent);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transform: rotate(${Math.random() * 360}deg);
                animation: solarFlareAnimation ${Math.random() * 2 + 1}s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 20px #FFD700;
            `;
            
            flareContainer.appendChild(flare);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('solarFlareAnimation')) {
            const style = document.createElement('style');
            style.id = 'solarFlareAnimation';
            style.textContent = `
                @keyframes solarFlareAnimation {
                    0% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(0);
                    }
                    50% { 
                        opacity: 1; 
                        transform: rotate(var(--rotation)) scaleX(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(flareContainer);
        
        setTimeout(() => {
            if (flareContainer.parentNode) {
                flareContainer.parentNode.removeChild(flareContainer);
            }
        }, 5000);
    }
    
    // Пояс астероидов
    function createAsteroidBelt() {
        const asteroidContainer = document.createElement('div');
        asteroidContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
        `;
        
        // Создаем астероиды
        for (let i = 0; i < 100; i++) {
            const asteroid = document.createElement('div');
            asteroid.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 5}px;
                height: ${Math.random() * 20 + 5}px;
                background: linear-gradient(45deg, #8B4513, #654321, #8B4513);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: asteroidAnimation ${Math.random() * 8 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                border-radius: ${Math.random() * 50}%;
                box-shadow: 0 0 10px #654321;
            `;
            
            asteroidContainer.appendChild(asteroid);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('asteroidAnimation')) {
            const style = document.createElement('style');
            style.id = 'asteroidAnimation';
            style.textContent = `
                @keyframes asteroidAnimation {
                    0% { 
                        transform: translateX(-100px) translateY(0px) rotate(0deg);
                        opacity: 0;
                    }
                    10% { 
                        opacity: 1;
                    }
                    90% { 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateX(100vw) translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(asteroidContainer);
        
        setTimeout(() => {
            if (asteroidContainer.parentNode) {
                asteroidContainer.parentNode.removeChild(asteroidContainer);
            }
        }, 13000);
    }
    
    // Кротовая нора
    function createWormhole() {
        const wormholeContainer = document.createElement('div');
        wormholeContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            pointer-events: none;
            z-index: 9998;
            animation: wormholeAnimation 7s ease-out forwards;
        `;
        
        // Создаем кротовую нору
        const wormhole = document.createElement('div');
        wormhole.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, 
                rgba(0, 0, 0, 0.9) 0%, 
                rgba(75, 0, 130, 0.7) 30%, 
                rgba(138, 43, 226, 0.5) 60%, 
                rgba(255, 255, 255, 0.1) 100%);
            border-radius: 50%;
            animation: wormholeCore 1s ease-in-out infinite;
            box-shadow: 0 0 50px #8A2BE2, inset 0 0 30px #000000;
        `;
        
        wormholeContainer.appendChild(wormhole);
        
        // Создаем спиральные частицы
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: radial-gradient(circle, #8A2BE2, #4B0082, transparent);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: wormholeParticle ${Math.random() * 4 + 3}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
                box-shadow: 0 0 10px #8A2BE2;
            `;
            
            particle.style.setProperty('--orbit-radius', (100 + Math.random() * 50) + 'px');
            particle.style.setProperty('--orbit-angle', (Math.random() * 360) + 'deg');
            
            wormholeContainer.appendChild(particle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('wormholeAnimation')) {
            const style = document.createElement('style');
            style.id = 'wormholeAnimation';
            style.textContent = `
                @keyframes wormholeAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.2) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
                    }
                }
                @keyframes wormholeCore {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
                    }
                }
                @keyframes wormholeParticle {
                    0% { 
                        transform: translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle)));
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(calc(var(--orbit-angle) + 720deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle) - 720deg));
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(wormholeContainer);
        
        setTimeout(() => {
            if (wormholeContainer.parentNode) {
                wormholeContainer.parentNode.removeChild(wormholeContainer);
            }
        }, 7000);
    }
    
    // ВРЕМЕННЫЕ ЭФФЕКТЫ - МАНИПУЛЯЦИЯ ВРЕМЕНЕМ
    
    // Остановка времени
    function createTimeStop() {
        const timeStopContainer = document.createElement('div');
        timeStopContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: rgba(0, 0, 0, 0.3);
        `;
        
        // Создаем эффект остановки времени
        const timeEffect = document.createElement('div');
        timeEffect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            border: 5px solid #00FFFF;
            border-radius: 50%;
            animation: timeStopAnimation 4s ease-out forwards;
            box-shadow: 0 0 50px #00FFFF;
        `;
        
        timeStopContainer.appendChild(timeEffect);
        
        // Создаем замороженные частицы
        for (let i = 0; i < 100; i++) {
            const frozenParticle = document.createElement('div');
            frozenParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: radial-gradient(circle, #00FFFF, #0080FF);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: frozenParticleAnimation 4s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 10px #00FFFF;
            `;
            
            timeStopContainer.appendChild(frozenParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('timeStopAnimation')) {
            const style = document.createElement('style');
            style.id = 'timeStopAnimation';
            style.textContent = `
                @keyframes timeStopAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    30% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(180deg);
                    }
                    70% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.2) rotate(360deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(540deg);
                    }
                }
                @keyframes frozenParticleAnimation {
                    0% { 
                        opacity: 0; 
                        transform: scale(0);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(timeStopContainer);
        
        setTimeout(() => {
            if (timeStopContainer.parentNode) {
                timeStopContainer.parentNode.removeChild(timeStopContainer);
            }
        }, 4000);
    }
    
    // Ускорение времени
    function createTimeAcceleration() {
        const timeAccelContainer = document.createElement('div');
        timeAccelContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(45deg, 
                rgba(255, 255, 0, 0.2) 0%, 
                rgba(255, 165, 0, 0.3) 50%, 
                rgba(255, 69, 0, 0.4) 100%);
        `;
        
        // Создаем быстрые частицы
        for (let i = 0; i < 150; i++) {
            const fastParticle = document.createElement('div');
            fastParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: radial-gradient(circle, #FFD700, #FFA500);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: fastParticleAnimation ${Math.random() * 1 + 0.5}s linear infinite;
                animation-delay: ${Math.random() * 1}s;
                box-shadow: 0 0 8px #FFD700;
            `;
            
            timeAccelContainer.appendChild(fastParticle);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('fastParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'fastParticleAnimation';
            style.textContent = `
                @keyframes fastParticleAnimation {
                    0% { 
                        transform: translateX(0px) translateY(0px) scale(1);
                        opacity: 0;
                    }
                    10% { 
                        opacity: 1;
                    }
                    90% { 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateX(${Math.random() * 200 - 100}px) translateY(${Math.random() * 200 - 100}px) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(timeAccelContainer);
        
        setTimeout(() => {
            if (timeAccelContainer.parentNode) {
                timeAccelContainer.parentNode.removeChild(timeAccelContainer);
            }
        }, 3000);
    }
    
    // Обращение времени
    function createTimeReversal() {
        const timeReverseContainer = document.createElement('div');
        timeReverseContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            pointer-events: none;
            z-index: 9998;
            animation: timeReverseAnimation 5s ease-out forwards;
        `;
        
        // Создаем обратные частицы
        for (let i = 0; i < 80; i++) {
            const reverseParticle = document.createElement('div');
            reverseParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 3}px;
                height: ${Math.random() * 8 + 3}px;
                background: radial-gradient(circle, #FF69B4, #FF1493);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: reverseParticleAnimation ${Math.random() * 3 + 2}s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 15px #FF69B4;
            `;
            
            const angle = (i / 80) * Math.PI * 2;
            const distance = 50 + Math.random() * 150;
            const startX = Math.cos(angle) * distance;
            const startY = Math.sin(angle) * distance;
            
            reverseParticle.style.setProperty('--startX', startX + 'px');
            reverseParticle.style.setProperty('--startY', startY + 'px');
            
            timeReverseContainer.appendChild(reverseParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('timeReverseAnimation')) {
            const style = document.createElement('style');
            style.id = 'timeReverseAnimation';
            style.textContent = `
                @keyframes timeReverseAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(-90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.3) rotate(-270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(-360deg);
                    }
                }
                @keyframes reverseParticleAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(calc(-50% + var(--startX)), calc(-50% + var(--startY))) scale(0);
                    }
                    50% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(calc(-50% - var(--startX)), calc(-50% - var(--startY))) scale(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(timeReverseContainer);
        
        setTimeout(() => {
            if (timeReverseContainer.parentNode) {
                timeReverseContainer.parentNode.removeChild(timeReverseContainer);
            }
        }, 5000);
    }
    
    // Временная петля
    function createTimeLoop() {
        const timeLoopContainer = document.createElement('div');
        timeLoopContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 500px;
            pointer-events: none;
            z-index: 9998;
            animation: timeLoopAnimation 6s ease-out forwards;
        `;
        
        // Создаем петлю времени
        const timeLoop = document.createElement('div');
        timeLoop.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            border: 3px solid #32CD32;
            border-radius: 50%;
            animation: timeLoopCore 2s linear infinite;
            box-shadow: 0 0 30px #32CD32;
        `;
        
        timeLoopContainer.appendChild(timeLoop);
        
        // Создаем циклические частицы
        for (let i = 0; i < 60; i++) {
            const loopParticle = document.createElement('div');
            loopParticle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #32CD32, #228B22);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: loopParticleAnimation 3s linear infinite;
                animation-delay: ${i * 0.05}s;
                box-shadow: 0 0 10px #32CD32;
            `;
            
            loopParticle.style.setProperty('--orbit-radius', (150 + i * 2) + 'px');
            loopParticle.style.setProperty('--orbit-angle', (i * 6) + 'deg');
            
            timeLoopContainer.appendChild(loopParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('timeLoopAnimation')) {
            const style = document.createElement('style');
            style.id = 'timeLoopAnimation';
            style.textContent = `
                @keyframes timeLoopAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.2) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
                    }
                }
                @keyframes timeLoopCore {
                    0% { 
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }
                @keyframes loopParticleAnimation {
                    0% { 
                        transform: translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle)));
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(calc(var(--orbit-angle) + 360deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle) - 360deg));
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(timeLoopContainer);
        
        setTimeout(() => {
            if (timeLoopContainer.parentNode) {
                timeLoopContainer.parentNode.removeChild(timeLoopContainer);
            }
        }, 6000);
    }
    
    // Разлом времени
    function createTimeFracture() {
        const timeFractureContainer = document.createElement('div');
        timeFractureContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(45deg, 
                rgba(255, 0, 255, 0.2) 0%, 
                rgba(0, 255, 255, 0.3) 50%, 
                rgba(255, 255, 0, 0.4) 100%);
        `;
        
        // Создаем трещины времени
        for (let i = 0; i < 15; i++) {
            const timeCrack = document.createElement('div');
            timeCrack.style.cssText = `
                position: absolute;
                width: ${Math.random() * 300 + 100}px;
                height: 3px;
                background: linear-gradient(90deg, 
                    transparent, 
                    #FF00FF, 
                    #00FFFF, 
                    #FFFF00, 
                    transparent);
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 80}%;
                transform: rotate(${Math.random() * 360}deg);
                animation: timeCrackAnimation 4s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 15px #FF00FF;
            `;
            
            timeFractureContainer.appendChild(timeCrack);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('timeCrackAnimation')) {
            const style = document.createElement('style');
            style.id = 'timeCrackAnimation';
            style.textContent = `
                @keyframes timeCrackAnimation {
                    0% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(0);
                    }
                    30% { 
                        opacity: 1; 
                        transform: rotate(var(--rotation)) scaleX(1);
                    }
                    70% { 
                        opacity: 1; 
                        transform: rotate(var(--rotation)) scaleX(1.2);
                    }
                    100% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(0.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(timeFractureContainer);
        
        setTimeout(() => {
            if (timeFractureContainer.parentNode) {
                timeFractureContainer.parentNode.removeChild(timeFractureContainer);
            }
        }, 6000);
    }
    
    // Временной шторм
    function createTemporalStorm() {
        const temporalStormContainer = document.createElement('div');
        temporalStormContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(180deg, 
                rgba(255, 0, 255, 0.3) 0%, 
                rgba(0, 255, 255, 0.4) 30%, 
                rgba(255, 255, 0, 0.5) 60%, 
                rgba(255, 0, 0, 0.6) 100%);
        `;
        
        // Создаем хаотические временные частицы
        for (let i = 0; i < 200; i++) {
            const temporalParticle = document.createElement('div');
            const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0000'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            temporalParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 3}px;
                height: ${Math.random() * 10 + 3}px;
                background: radial-gradient(circle, ${randomColor}, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: temporalParticleAnimation ${Math.random() * 4 + 2}s ease-out forwards;
                animation-delay: ${Math.random() * 3}s;
                box-shadow: 0 0 15px ${randomColor};
            `;
            
            temporalStormContainer.appendChild(temporalParticle);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('temporalParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'temporalParticleAnimation';
            style.textContent = `
                @keyframes temporalParticleAnimation {
                    0% { 
                        opacity: 0; 
                        transform: scale(0) rotate(0deg);
                    }
                    25% { 
                        opacity: 1; 
                        transform: scale(1.5) rotate(90deg);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(0.8) rotate(180deg);
                    }
                    75% { 
                        opacity: 1; 
                        transform: scale(1.2) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(temporalStormContainer);
        
        setTimeout(() => {
            if (temporalStormContainer.parentNode) {
                temporalStormContainer.parentNode.removeChild(temporalStormContainer);
            }
        }, 6000);
    }
    
    // РЕЖИМ ХАОСА - ВСЕ ЭФФЕКТЫ ОДНОВРЕМЕННО!
    
    // Обычный режим хаоса
    function createChaosMode() {
        showMagicInfo("🔥 РЕЖИМ ХАОСА АКТИВИРОВАН! 🔥");
        
        // Запускаем все элементальные эффекты
        setTimeout(() => createFireStorm(), 0);
        setTimeout(() => createWaterWhirlpool(), 500);
        setTimeout(() => createEarthquake(), 1000);
        setTimeout(() => createWindTornado(), 1500);
        setTimeout(() => createIceAge(), 2000);
        setTimeout(() => createThunderStorm(), 2500);
        
        // Запускаем космические эффекты
        setTimeout(() => createBlackHole(), 3000);
        setTimeout(() => createNebula(), 3500);
        setTimeout(() => createSupernova(), 4000);
        setTimeout(() => createSolarFlare(), 4500);
        setTimeout(() => createAsteroidBelt(), 5000);
        setTimeout(() => createWormhole(), 5500);
        
        // Запускаем временные эффекты
        setTimeout(() => createTimeStop(), 6000);
        setTimeout(() => createTimeAcceleration(), 6500);
        setTimeout(() => createTimeReversal(), 7000);
        setTimeout(() => createTimeLoop(), 7500);
        setTimeout(() => createTimeFracture(), 8000);
        setTimeout(() => createTemporalStorm(), 8500);
        
        // Дополнительные эффекты
        setTimeout(() => createRainbow(), 9000);
        setTimeout(() => createLightning(), 9500);
        
        // Создаем хаотический фон
        const chaosBackground = document.createElement('div');
        chaosBackground.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9997;
            background: linear-gradient(45deg, 
                rgba(255, 0, 0, 0.3) 0%, 
                rgba(0, 255, 0, 0.3) 16.66%, 
                rgba(0, 0, 255, 0.3) 33.33%, 
                rgba(255, 255, 0, 0.3) 50%, 
                rgba(255, 0, 255, 0.3) 66.66%, 
                rgba(0, 255, 255, 0.3) 83.33%, 
                rgba(255, 0, 0, 0.3) 100%);
            animation: chaosBackgroundAnimation 15s ease-in-out infinite;
        `;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('chaosBackgroundAnimation')) {
            const style = document.createElement('style');
            style.id = 'chaosBackgroundAnimation';
            style.textContent = `
                @keyframes chaosBackgroundAnimation {
                    0%, 100% { 
                        filter: hue-rotate(0deg) brightness(1);
                    }
                    25% { 
                        filter: hue-rotate(90deg) brightness(1.2);
                    }
                    50% { 
                        filter: hue-rotate(180deg) brightness(0.8);
                    }
                    75% { 
                        filter: hue-rotate(270deg) brightness(1.1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(chaosBackground);
        
        setTimeout(() => {
            if (chaosBackground.parentNode) {
                chaosBackground.parentNode.removeChild(chaosBackground);
            }
        }, 15000);
    }
    
    // Ультимативный режим хаоса
    function createUltimateChaosMode() {
        showMagicInfo("💀 УЛЬТИМАТИВНЫЙ ХАОС! 💀");
        
        // Запускаем ВСЕ эффекты с минимальными задержками
        const allEffects = [
            createFireStorm, createWaterWhirlpool, createEarthquake, createWindTornado, createIceAge, createThunderStorm,
            createBlackHole, createNebula, createSupernova, createSolarFlare, createAsteroidBelt, createWormhole,
            createTimeStop, createTimeAcceleration, createTimeReversal, createTimeLoop, createTimeFracture, createTemporalStorm,
            createRainbow, createLightning, createMagicExplosion, createSynergyEffect
        ];
        
        // Запускаем все эффекты с интервалом 100мс
        allEffects.forEach((effect, index) => {
            setTimeout(() => {
                try {
                    effect();
                } catch (e) {
                    console.log('Effect error:', e);
                }
            }, index * 100);
        });
        
        // Создаем ультимативный хаотический фон
        const ultimateChaosBackground = document.createElement('div');
        ultimateChaosBackground.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9997;
            background: radial-gradient(circle at center, 
                rgba(255, 0, 0, 0.4) 0%, 
                rgba(0, 255, 0, 0.4) 14.28%, 
                rgba(0, 0, 255, 0.4) 28.57%, 
                rgba(255, 255, 0, 0.4) 42.85%, 
                rgba(255, 0, 255, 0.4) 57.14%, 
                rgba(0, 255, 255, 0.4) 71.42%, 
                rgba(255, 128, 0, 0.4) 85.71%, 
                rgba(255, 0, 0, 0.4) 100%);
            animation: ultimateChaosBackgroundAnimation 2s ease-in-out infinite;
        `;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('ultimateChaosBackgroundAnimation')) {
            const style = document.createElement('style');
            style.id = 'ultimateChaosBackgroundAnimation';
            style.textContent = `
                @keyframes ultimateChaosBackgroundAnimation {
                    0% { 
                        filter: hue-rotate(0deg) brightness(1) saturate(1);
                        transform: scale(1) rotate(0deg);
                    }
                    25% { 
                        filter: hue-rotate(90deg) brightness(1.5) saturate(2);
                        transform: scale(1.1) rotate(90deg);
                    }
                    50% { 
                        filter: hue-rotate(180deg) brightness(0.5) saturate(0.5);
                        transform: scale(0.9) rotate(180deg);
                    }
                    75% { 
                        filter: hue-rotate(270deg) brightness(1.3) saturate(1.8);
                        transform: scale(1.05) rotate(270deg);
                    }
                    100% { 
                        filter: hue-rotate(360deg) brightness(1) saturate(1);
                        transform: scale(1) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(ultimateChaosBackground);
        
        // Создаем хаотические частицы по всему экрану
        for (let i = 0; i < 500; i++) {
            setTimeout(() => {
                const chaosParticle = document.createElement('div');
                const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF8000'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                chaosParticle.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 20 + 5}px;
                    height: ${Math.random() * 20 + 5}px;
                    background: radial-gradient(circle, ${randomColor}, transparent);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    z-index: 9998;
                    animation: ultimateChaosParticle ${Math.random() * 3 + 2}s ease-out forwards;
                    box-shadow: 0 0 20px ${randomColor};
                `;
                
                document.body.appendChild(chaosParticle);
                
                setTimeout(() => {
                    if (chaosParticle.parentNode) {
                        chaosParticle.parentNode.removeChild(chaosParticle);
                    }
                }, 5000);
            }, i * 50);
        }
        
        // Добавляем CSS анимацию для частиц
        if (!document.getElementById('ultimateChaosParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'ultimateChaosParticleAnimation';
            style.textContent = `
                @keyframes ultimateChaosParticle {
                    0% { 
                        opacity: 1; 
                        transform: scale(0) rotate(0deg);
                    }
                    25% { 
                        opacity: 1; 
                        transform: scale(2) rotate(90deg);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(0.5) rotate(180deg);
                    }
                    75% { 
                        opacity: 1; 
                        transform: scale(1.5) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (ultimateChaosBackground.parentNode) {
                ultimateChaosBackground.parentNode.removeChild(ultimateChaosBackground);
            }
        }, 20000);
    }
    
    // МНОГОПОЛЬЗОВАТЕЛЬСКАЯ СИСТЕМА МАГИИ
    
    // Инициализация многопользовательской системы
    function initializeMultiplayerMagic() {
        // Создаем UI для многопользовательской системы
        createMultiplayerUI();
        
        // Инициализируем симуляцию сети
        initializeNetworkSimulation();
        
        // Добавляем виртуальных игроков для демонстрации
        addVirtualPlayers();
        
        // Показываем информацию о подключении
        showMultiplayerInfo();
        
        // Создаем чат для магов
        createMagicChat();
        
        // Создаем систему поиска магов
        createMagicRadar();
        
        // Создаем систему пробивания дыр в реальности
        createRealityPunchHole();
        
        // Инициализируем мобильную оптимизацию
        if (mobileUI.enabled) {
            initializeMobileOptimization();
        }
    }
    
    // Создание UI для многопользовательской системы
    function createMultiplayerUI() {
        const multiplayerPanel = document.createElement('div');
        multiplayerPanel.id = 'multiplayerPanel';
        multiplayerPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 9999;
            border: 2px solid #00FF00;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            min-width: 250px;
            max-width: 300px;
        `;
        
        multiplayerPanel.innerHTML = `
            <div style="color: #00FF00; font-weight: bold; margin-bottom: 10px;">🌐 МАГИЧЕСКАЯ СЕТЬ</div>
            <div>Ваш ID: <span style="color: #00FFFF;">${playerId}</span></div>
            <div>Имя: <span style="color: #FFD700;">${playerName}</span></div>
            <div>Статус: <span id="networkStatus" style="color: #00FF00;">Подключен</span></div>
            <div>Игроков онлайн: <span id="playerCount" style="color: #FF69B4;">1</span></div>
            <div style="margin-top: 10px; font-size: 10px; color: #CCC;">
                Магия синхронизируется между всеми игроками!
            </div>
            <div id="recentMagic" style="margin-top: 10px; font-size: 10px; color: #FFD700;">
                Последняя магия: <span id="lastMagicEffect">Нет</span>
            </div>
        `;
        
        document.body.appendChild(multiplayerPanel);
    }
    
    // Инициализация симуляции сети
    function initializeNetworkSimulation() {
        // Симулируем подключение к сети
        setTimeout(() => {
            magicNetwork.isConnected = true;
            updateNetworkStatus('Подключен');
            
            // Симулируем получение магии от других игроков
            simulateIncomingMagic();
        }, 1000);
    }
    
    // Добавление виртуальных игроков для демонстрации
    function addVirtualPlayers() {
        const virtualPlayers = [
            { id: 'mage_001', name: 'Алхимик_42', level: 5 },
            { id: 'mage_002', name: 'Некромант_99', level: 8 },
            { id: 'mage_003', name: 'Элементалист_17', level: 3 },
            { id: 'mage_004', name: 'Хрономант_77', level: 12 },
            { id: 'mage_005', name: 'Космолог_33', level: 6 }
        ];
        
        virtualPlayers.forEach(player => {
            networkSimulation.players.set(player.id, {
                ...player,
                lastMagicTime: Date.now() - Math.random() * 30000,
                magicCount: Math.floor(Math.random() * 50)
            });
        });
        
        updatePlayerCount();
    }
    
    // Симуляция входящей магии от других игроков
    function simulateIncomingMagic() {
        setInterval(() => {
            if (!magicNetwork.isConnected) return;
            
            // Случайно выбираем виртуального игрока
            const players = Array.from(networkSimulation.players.values());
            if (players.length === 0) return;
            
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            
            // Проверяем, не слишком ли часто он использует магию
            if (Date.now() - randomPlayer.lastMagicTime < 5000) return;
            
            // Выбираем случайный эффект
            const allEffects = [];
            Object.values(magicEffects).forEach(category => {
                category.forEach(effect => allEffects.push(effect));
            });
            
            const randomEffect = allEffects[Math.floor(Math.random() * allEffects.length)];
            
            // Отправляем магию от другого игрока
            receiveMagicFromPlayer(randomPlayer, randomEffect);
            
            // Обновляем время последней магии
            randomPlayer.lastMagicTime = Date.now();
            randomPlayer.magicCount++;
            
        }, Math.random() * 10000 + 5000); // Каждые 5-15 секунд
    }
    
    // Получение магии от другого игрока
    function receiveMagicFromPlayer(player, effect) {
        // Показываем уведомление
        showMagicFromPlayer(player, effect);
        
        // Запускаем эффект
        setTimeout(() => {
            effect.effect();
            showMagicInfo(`Магия от ${player.name}: ${effect.name}`);
        }, networkSimulation.latency);
        
        // Обновляем статистику
        updateLastMagicEffect(`${player.name}: ${effect.name}`);
    }
    
    // Показ магии от другого игрока
    function showMagicFromPlayer(player, effect) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 15px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            z-index: 10000;
            border: 3px solid #00FF00;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            text-align: center;
            animation: magicNotificationAnimation 3s ease-out forwards;
        `;
        
        notification.innerHTML = `
            <div style="color: #00FF00; font-weight: bold; margin-bottom: 10px;">
                🌟 МАГИЯ ОТ ДРУГОГО ИГРОКА! 🌟
            </div>
            <div style="color: #FFD700; font-size: 18px; margin-bottom: 10px;">
                ${player.name}
            </div>
            <div style="color: #00FFFF; font-size: 14px;">
                ${effect.name}
            </div>
            <div style="color: #FF69B4; font-size: 12px; margin-top: 10px;">
                Уровень: ${player.level}
            </div>
        `;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('magicNotificationAnimation')) {
            const style = document.createElement('style');
            style.id = 'magicNotificationAnimation';
            style.textContent = `
                @keyframes magicNotificationAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.5);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    // Отправка магии другим игрокам
    function sendMagicToPlayers(effect) {
        if (!magicNetwork.isConnected) return;
        
        const magicData = {
            type: 'magic_cast',
            playerId: playerId,
            playerName: playerName,
            effectName: effect.name,
            timestamp: Date.now(),
            level: magicLevel
        };
        
        // Симулируем отправку в сеть
        setTimeout(() => {
            // В реальной системе здесь был бы WebSocket.send()
            console.log('Отправка магии в сеть:', magicData);
            
            // Обновляем статистику
            updateLastMagicEffect(`Вы: ${effect.name}`);
        }, networkSimulation.latency);
    }
    
    // Обновление статуса сети
    function updateNetworkStatus(status) {
        const statusElement = document.getElementById('networkStatus');
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.style.color = status === 'Подключен' ? '#00FF00' : '#FF0000';
        }
    }
    
    // Обновление количества игроков
    function updatePlayerCount() {
        const countElement = document.getElementById('playerCount');
        if (countElement) {
            const totalPlayers = networkSimulation.players.size + 1; // +1 для текущего игрока
            countElement.textContent = totalPlayers;
        }
    }
    
    // Обновление последнего магического эффекта
    function updateLastMagicEffect(effect) {
        const effectElement = document.getElementById('lastMagicEffect');
        if (effectElement) {
            effectElement.textContent = effect;
        }
    }
    
    // Показ информации о многопользовательской системе
    function showMultiplayerInfo() {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 11px;
            z-index: 9999;
            border: 2px solid #00FF00;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            max-width: 300px;
            animation: multiplayerInfoAnimation 8s ease-in-out infinite;
        `;
        
        infoDiv.innerHTML = `
            <div style="color: #00FF00; font-weight: bold; margin-bottom: 10px;">🌐 МНОГОПОЛЬЗОВАТЕЛЬСКАЯ МАГИЯ</div>
            <div>• Ваша магия влияет на всех игроков</div>
            <div>• Магия других игроков появляется у вас</div>
            <div>• Синхронизация в реальном времени</div>
            <div>• Общий магический опыт</div>
            <div style="margin-top: 10px; color: #FFD700;">
                Используйте магию и наблюдайте за реакцией других!
            </div>
        `;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('multiplayerInfoAnimation')) {
            const style = document.createElement('style');
            style.id = 'multiplayerInfoAnimation';
            style.textContent = `
                @keyframes multiplayerInfoAnimation {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(infoDiv);
        
        // Скрываем через 15 секунд
        setTimeout(() => {
            if (infoDiv.parentNode) {
                infoDiv.style.animation = 'multiplayerInfoFadeOut 2s ease-out forwards';
                setTimeout(() => {
                    if (infoDiv.parentNode) {
                        infoDiv.parentNode.removeChild(infoDiv);
                    }
                }, 2000);
            }
        }, 15000);
        
        // Добавляем CSS анимацию исчезновения
        if (!document.getElementById('multiplayerInfoFadeOutAnimation')) {
            const style = document.createElement('style');
            style.id = 'multiplayerInfoFadeOutAnimation';
            style.textContent = `
                @keyframes multiplayerInfoFadeOut {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Создание чата для магов
    function createMagicChat() {
        const chatContainer = document.createElement('div');
        chatContainer.id = 'magicChat';
        chatContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 350px;
            height: 300px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #8A2BE2;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
        `;
        
        // Заголовок чата
        const chatHeader = document.createElement('div');
        chatHeader.style.cssText = `
            background: linear-gradient(90deg, #8A2BE2, #4B0082);
            color: white;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            font-weight: bold;
            text-align: center;
        `;
        chatHeader.textContent = '💬 ЧАТ МАГОВ';
        chatContainer.appendChild(chatHeader);
        
        // Область сообщений
        const messagesArea = document.createElement('div');
        messagesArea.id = 'chatMessages';
        messagesArea.style.cssText = `
            flex: 1;
            padding: 10px;
            overflow-y: auto;
            color: white;
            font-size: 12px;
            background: rgba(0, 0, 0, 0.5);
        `;
        chatContainer.appendChild(messagesArea);
        
        // Поле ввода
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            display: flex;
            padding: 10px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 0 0 8px 8px;
        `;
        
        const messageInput = document.createElement('input');
        messageInput.type = 'text';
        messageInput.placeholder = 'Введите сообщение...';
        messageInput.style.cssText = `
            flex: 1;
            padding: 8px;
            border: 1px solid #8A2BE2;
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 12px;
        `;
        
        const sendButton = document.createElement('button');
        sendButton.textContent = 'Отправить';
        sendButton.style.cssText = `
            margin-left: 10px;
            padding: 8px 15px;
            background: linear-gradient(45deg, #8A2BE2, #4B0082);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
        `;
        
        inputContainer.appendChild(messageInput);
        inputContainer.appendChild(sendButton);
        chatContainer.appendChild(inputContainer);
        
        document.body.appendChild(chatContainer);
        
        // Обработчики событий
        sendButton.addEventListener('click', () => {
            sendChatMessage(messageInput.value);
            messageInput.value = '';
        });
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage(messageInput.value);
                messageInput.value = '';
            }
        });
        
        // Добавляем приветственные сообщения
        addChatMessage('Система', 'Добро пожаловать в чат магов!', '#00FF00');
        addChatMessage('Алхимик_42', 'Привет всем! Кто хочет создать зелье?', '#FFD700');
        addChatMessage('Некромант_99', 'Темная магия правит миром!', '#FF0000');
        
        // Симулируем сообщения от других игроков
        simulateChatMessages();
    }
    
    // Отправка сообщения в чат
    function sendChatMessage(message) {
        if (!message.trim()) return;
        
        addChatMessage(playerName, message, '#00FFFF');
        
        // Симулируем получение сообщения другими игроками
        setTimeout(() => {
            const responses = [
                'Интересно...',
                'Отличная идея!',
                'Попробуем вместе!',
                'Магия усиливается!',
                'Великолепно!',
                'Это работает!',
                'Невероятно!',
                'Продолжаем!'
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const players = Array.from(networkSimulation.players.values());
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            
            addChatMessage(randomPlayer.name, randomResponse, '#FF69B4');
        }, Math.random() * 3000 + 1000);
    }
    
    // Добавление сообщения в чат
    function addChatMessage(sender, message, color) {
        const messagesArea = document.getElementById('chatMessages');
        if (!messagesArea) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            margin-bottom: 5px;
            padding: 5px;
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.3);
        `;
        
        const senderSpan = document.createElement('span');
        senderSpan.style.cssText = `color: ${color}; font-weight: bold;`;
        senderSpan.textContent = sender + ': ';
        
        const messageSpan = document.createElement('span');
        messageSpan.style.color = 'white';
        messageSpan.textContent = message;
        
        messageDiv.appendChild(senderSpan);
        messageDiv.appendChild(messageSpan);
        messagesArea.appendChild(messageDiv);
        
        // Прокручиваем вниз
        messagesArea.scrollTop = messagesArea.scrollHeight;
        
        // Ограничиваем количество сообщений
        const messages = messagesArea.children;
        if (messages.length > 50) {
            messagesArea.removeChild(messages[0]);
        }
    }
    
    // Симуляция сообщений в чате
    function simulateChatMessages() {
        const chatMessages = [
            { text: 'Кто-нибудь знает заклинание левитации?', sender: 'Элементалист_17' },
            { text: 'Попробуйте комбинацию ветра и земли!', sender: 'Хрономант_77' },
            { text: 'Только что создал новую магию!', sender: 'Космолог_33' },
            { text: 'Временные эффекты работают отлично!', sender: 'Хрономант_77' },
            { text: 'Космическая магия невероятна!', sender: 'Космолог_33' },
            { text: 'Элементальные комбинации - это сила!', sender: 'Элементалист_17' },
            { text: 'Темная магия требует осторожности...', sender: 'Некромант_99' },
            { text: 'Алхимия - основа всех магических искусств!', sender: 'Алхимик_42' }
        ];
        
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% шанс сообщения каждые 10 секунд
                const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
                addChatMessage(randomMessage.sender, randomMessage.text, '#FFD700');
            }
        }, 10000);
    }
    
    // МАГИЧЕСКИЙ РАДАР И СИСТЕМА ПОИСКА МАГОВ
    
    // Создание магического радара
    function createMagicRadar() {
        const radarContainer = document.createElement('div');
        radarContainer.id = 'magicRadar';
        radarContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.9);
            border: 3px solid #00FF00;
            border-radius: 50%;
            z-index: 9999;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
        `;
        
        // Создаем радарную сетку
        const radarGrid = document.createElement('div');
        radarGrid.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 180px;
            height: 180px;
            border: 1px solid rgba(0, 255, 0, 0.3);
            border-radius: 50%;
        `;
        radarContainer.appendChild(radarGrid);
        
        // Создаем центральную точку (игрок)
        const centerPoint = document.createElement('div');
        centerPoint.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 8px;
            height: 8px;
            background: #00FF00;
            border-radius: 50%;
            box-shadow: 0 0 10px #00FF00;
        `;
        radarContainer.appendChild(centerPoint);
        
        // Создаем сканирующую линию
        const scanLine = document.createElement('div');
        scanLine.id = 'radarScanLine';
        scanLine.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 2px;
            height: 90px;
            background: linear-gradient(to bottom, transparent, #00FF00, transparent);
            transform-origin: bottom center;
            animation: radarScan 3s linear infinite;
        `;
        radarContainer.appendChild(scanLine);
        
        // Заголовок радара
        const radarTitle = document.createElement('div');
        radarTitle.style.cssText = `
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            color: #00FF00;
            font-family: Arial, sans-serif;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
        `;
        radarTitle.textContent = '🔍 МАГИЧЕСКИЙ РАДАР';
        radarContainer.appendChild(radarTitle);
        
        // Информационная панель
        const radarInfo = document.createElement('div');
        radarInfo.id = 'radarInfo';
        radarInfo.style.cssText = `
            position: absolute;
            bottom: -80px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-family: Arial, sans-serif;
            font-size: 10px;
            text-align: center;
            background: rgba(0, 0, 0, 0.8);
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #00FF00;
        `;
        radarInfo.innerHTML = `
            <div>Найдено магов: <span id="detectedMages">0</span></div>
            <div>Ближайший: <span id="nearestMage">Нет</span></div>
        `;
        radarContainer.appendChild(radarInfo);
        
        document.body.appendChild(radarContainer);
        
        // Добавляем CSS анимацию
        if (!document.getElementById('radarScanAnimation')) {
            const style = document.createElement('style');
            style.id = 'radarScanAnimation';
            style.textContent = `
                @keyframes radarScan {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Запускаем сканирование
        startRadarScanning();
    }
    
    // Запуск сканирования радара
    function startRadarScanning() {
        setInterval(() => {
            scanForMages();
        }, 2000); // Сканируем каждые 2 секунды
    }
    
    // Сканирование магов
    function scanForMages() {
        const radarContainer = document.getElementById('magicRadar');
        if (!radarContainer) return;
        
        // Удаляем старые точки магов
        const oldMagePoints = radarContainer.querySelectorAll('.magePoint');
        oldMagePoints.forEach(point => point.remove());
        
        // Получаем список игроков
        const players = Array.from(networkSimulation.players.values());
        let nearestMage = null;
        let minDistance = Infinity;
        
        players.forEach((player, index) => {
            // Случайное местоположение на радаре
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 80 + 20; // 20-100px от центра
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // Создаем точку мага
            const magePoint = document.createElement('div');
            magePoint.className = 'magePoint';
            magePoint.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #FFD700, #FFA500);
                border-radius: 50%;
                box-shadow: 0 0 8px #FFD700;
                animation: magePointPulse 2s ease-in-out infinite;
                cursor: pointer;
            `;
            
            // Добавляем информацию о маге при наведении
            magePoint.title = `${player.name} (Уровень ${player.level})`;
            
            // Обработчик клика для создания портала
            magePoint.addEventListener('click', () => {
                createPortalToMage(player);
            });
            
            radarContainer.appendChild(magePoint);
            
            // Проверяем ближайшего мага
            if (distance < minDistance) {
                minDistance = distance;
                nearestMage = player;
            }
        });
        
        // Обновляем информацию
        const detectedMagesElement = document.getElementById('detectedMages');
        const nearestMageElement = document.getElementById('nearestMage');
        
        if (detectedMagesElement) {
            detectedMagesElement.textContent = players.length;
        }
        
        if (nearestMageElement && nearestMage) {
            nearestMageElement.textContent = `${nearestMage.name} (${Math.round(minDistance)}px)`;
        }
        
        // Добавляем CSS анимацию для точек магов
        if (!document.getElementById('magePointPulseAnimation')) {
            const style = document.createElement('style');
            style.id = 'magePointPulseAnimation';
            style.textContent = `
                @keyframes magePointPulse {
                    0%, 100% { 
                        transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.5);
                        opacity: 0.7;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // СИСТЕМА ПРОБИВАНИЯ ДЫР В РЕАЛЬНОСТИ
    
    // Создание системы пробивания дыр
    function createRealityPunchHole() {
        // Добавляем клавишу для пробивания дыр
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'p') {
                e.preventDefault();
                punchRealityHole();
            }
        });
        
        // Добавляем кнопку пробивания дыр
        const punchButton = document.createElement('button');
        punchButton.id = 'punchRealityButton';
        punchButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, #FF0000, #8B0000);
            border: 3px solid #FFD700;
            border-radius: 50%;
            color: white;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
            animation: punchButtonPulse 2s ease-in-out infinite;
        `;
        punchButton.textContent = '👊';
        punchButton.title = 'Пробить дыру в реальности (P)';
        
        punchButton.addEventListener('click', punchRealityHole);
        
        document.body.appendChild(punchButton);
        
        // Добавляем CSS анимацию
        if (!document.getElementById('punchButtonPulseAnimation')) {
            const style = document.createElement('style');
            style.id = 'punchButtonPulseAnimation';
            style.textContent = `
                @keyframes punchButtonPulse {
                    0%, 100% { 
                        transform: scale(1);
                        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
                    }
                    50% { 
                        transform: scale(1.1);
                        box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Пробивание дыры в реальности
    function punchRealityHole() {
        showMagicInfo("💥 ПРОБИВАНИЕ ДЫРЫ В РЕАЛЬНОСТИ! 💥");
        
        // Создаем эффект пробивания
        const punchContainer = document.createElement('div');
        punchContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
        `;
        
        // Создаем трещины в реальности
        for (let i = 0; i < 20; i++) {
            const crack = document.createElement('div');
            crack.style.cssText = `
                position: absolute;
                width: ${Math.random() * 400 + 100}px;
                height: 3px;
                background: linear-gradient(90deg, 
                    transparent, 
                    #FF0000, 
                    #FFD700, 
                    #FF0000, 
                    transparent);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                transform: rotate(${Math.random() * 360}deg);
                animation: realityCrackAnimation 4s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 15px #FF0000;
            `;
            
            punchContainer.appendChild(crack);
        }
        
        // Создаем дыру в центре
        const realityHole = document.createElement('div');
        realityHole.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, 
                rgba(0, 0, 0, 0.9) 0%, 
                rgba(255, 0, 0, 0.3) 30%, 
                rgba(255, 215, 0, 0.2) 60%, 
                transparent 100%);
            border-radius: 50%;
            animation: realityHoleAnimation 5s ease-out forwards;
            box-shadow: 0 0 50px #FF0000, inset 0 0 30px #000000;
        `;
        
        punchContainer.appendChild(realityHole);
        
        // Создаем портал в дыре
        setTimeout(() => {
            createDimensionalPortal();
        }, 2000);
        
        // Добавляем CSS анимации
        if (!document.getElementById('realityCrackAnimation')) {
            const style = document.createElement('style');
            style.id = 'realityCrackAnimation';
            style.textContent = `
                @keyframes realityCrackAnimation {
                    0% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(0);
                    }
                    30% { 
                        opacity: 1; 
                        transform: rotate(var(--rotation)) scaleX(1);
                    }
                    70% { 
                        opacity: 1; 
                        transform: rotate(var(--rotation)) scaleX(1.2);
                    }
                    100% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(0.5);
                    }
                }
                @keyframes realityHoleAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.2) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(punchContainer);
        
        setTimeout(() => {
            if (punchContainer.parentNode) {
                punchContainer.parentNode.removeChild(punchContainer);
            }
        }, 5000);
    }
    
    // Создание портала к магу
    function createPortalToMage(mage) {
        showMagicInfo(`🌀 ПОРТАЛ К ${mage.name.toUpperCase()}! 🌀`);
        
        const portalContainer = document.createElement('div');
        portalContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            pointer-events: none;
            z-index: 9998;
            animation: portalAnimation 6s ease-out forwards;
        `;
        
        // Создаем портал
        const portal = document.createElement('div');
        portal.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, 
                rgba(138, 43, 226, 0.8) 0%, 
                rgba(75, 0, 130, 0.6) 30%, 
                rgba(0, 0, 0, 0.9) 60%, 
                rgba(255, 255, 255, 0.1) 100%);
            border-radius: 50%;
            animation: portalCore 2s ease-in-out infinite;
            box-shadow: 0 0 50px #8A2BE2, inset 0 0 30px #000000;
        `;
        
        portalContainer.appendChild(portal);
        
        // Создаем спиральные частицы портала
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 2}px;
                height: ${Math.random() * 8 + 2}px;
                background: radial-gradient(circle, #8A2BE2, #4B0082, transparent);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: portalParticle ${Math.random() * 4 + 3}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
                box-shadow: 0 0 10px #8A2BE2;
            `;
            
            particle.style.setProperty('--orbit-radius', (150 + Math.random() * 50) + 'px');
            particle.style.setProperty('--orbit-angle', (Math.random() * 360) + 'deg');
            
            portalContainer.appendChild(particle);
        }
        
        // Показываем информацию о маге
        const mageInfo = document.createElement('div');
        mageInfo.style.cssText = `
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            background: rgba(0, 0, 0, 0.8);
            padding: 10px;
            border-radius: 10px;
            border: 2px solid #8A2BE2;
        `;
        mageInfo.innerHTML = `
            <div style="color: #8A2BE2;">🌀 ПОРТАЛ К МАГУ 🌀</div>
            <div style="color: #FFD700;">${mage.name}</div>
            <div style="color: #00FFFF;">Уровень: ${mage.level}</div>
        `;
        
        portalContainer.appendChild(mageInfo);
        
        // Добавляем CSS анимации
        if (!document.getElementById('portalAnimation')) {
            const style = document.createElement('style');
            style.id = 'portalAnimation';
            style.textContent = `
                @keyframes portalAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.1) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.3) rotate(360deg);
                    }
                }
                @keyframes portalCore {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
                    }
                }
                @keyframes portalParticle {
                    0% { 
                        transform: translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle)));
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(calc(var(--orbit-angle) + 720deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--orbit-angle) - 720deg));
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(portalContainer);
        
        setTimeout(() => {
            if (portalContainer.parentNode) {
                portalContainer.parentNode.removeChild(portalContainer);
            }
        }, 6000);
    }
    
    // Создание межпространственного портала
    function createDimensionalPortal() {
        const dimensionalPortal = document.createElement('div');
        dimensionalPortal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 500px;
            pointer-events: none;
            z-index: 9998;
            animation: dimensionalPortalAnimation 8s ease-out forwards;
        `;
        
        // Создаем многослойный портал
        for (let layer = 0; layer < 5; layer++) {
            const portalLayer = document.createElement('div');
            portalLayer.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: ${400 - layer * 60}px;
                height: ${400 - layer * 60}px;
                border: 2px solid ${['#FF0000', '#FFD700', '#00FF00', '#00FFFF', '#8A2BE2'][layer]};
                border-radius: 50%;
                animation: portalLayerAnimation ${3 + layer}s linear infinite;
                animation-delay: ${layer * 0.5}s;
                box-shadow: 0 0 20px ${['#FF0000', '#FFD700', '#00FF00', '#00FFFF', '#8A2BE2'][layer]};
            `;
            
            dimensionalPortal.appendChild(portalLayer);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('dimensionalPortalAnimation')) {
            const style = document.createElement('style');
            style.id = 'dimensionalPortalAnimation';
            style.textContent = `
                @keyframes dimensionalPortalAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.2) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
                    }
                }
                @keyframes portalLayerAnimation {
                    0% { 
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(dimensionalPortal);
        
        setTimeout(() => {
            if (dimensionalPortal.parentNode) {
                dimensionalPortal.parentNode.removeChild(dimensionalPortal);
            }
        }, 8000);
    }
    
    // МОБИЛЬНАЯ ОПТИМИЗАЦИЯ И СЕНСОРНОЕ УПРАВЛЕНИЕ
    
    // Инициализация мобильной оптимизации
    function initializeMobileOptimization() {
        console.log('📱 Мобильная оптимизация активирована!');
        
        // Создаем мобильный интерфейс
        createMobileMagicInterface();
        
        // Добавляем жестовую магию
        initializeGestureMagic();
        
        // Оптимизируем существующие элементы
        optimizeForMobile();
        
        // Показываем мобильные подсказки
        showMobileTips();
    }
    
    // Создание мобильного магического интерфейса
    function createMobileMagicInterface() {
        // Создаем контейнер для мобильных кнопок
        const mobileContainer = document.createElement('div');
        mobileContainer.id = 'mobileMagicContainer';
        mobileContainer.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.9));
            padding: 20px 10px 10px 10px;
            z-index: 10000;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        `;
        
        // Создаем кнопки для основных магических эффектов
        const magicButtons = [
            { key: 'f', name: '🔥', effect: 'Огненный шторм', color: '#FF4500' },
            { key: 'w', name: '💧', effect: 'Водоворот', color: '#00BFFF' },
            { key: 'e', name: '🌍', effect: 'Землетрясение', color: '#8B4513' },
            { key: 'a', name: '💨', effect: 'Ветряной торнадо', color: '#87CEEB' },
            { key: 'i', name: '❄️', effect: 'Ледниковый период', color: '#B0E0E6' },
            { key: 't', name: '⚡', effect: 'Грозовой шторм', color: '#FFD700' },
            { key: 'b', name: '🕳️', effect: 'Черная дыра', color: '#000000' },
            { key: 'n', name: '🌌', effect: 'Туманность', color: '#8A2BE2' },
            { key: '1', name: '⏰', effect: 'Остановка времени', color: '#00FFFF' },
            { key: '2', name: '⚡', effect: 'Ускорение времени', color: '#FFD700' },
            { key: 'r', name: '🌈', effect: 'Радуга', color: '#FF69B4' },
            { key: 'l', name: '⚡', effect: 'Молния', color: '#FFFF00' }
        ];
        
        magicButtons.forEach(button => {
            const magicButton = document.createElement('button');
            magicButton.className = 'mobileMagicButton';
            magicButton.style.cssText = `
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 3px solid ${button.color};
                background: radial-gradient(circle, ${button.color}, rgba(0, 0, 0, 0.8));
                color: white;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                transition: all 0.3s ease;
                user-select: none;
                -webkit-user-select: none;
                -webkit-tap-highlight-color: transparent;
            `;
            
            magicButton.textContent = button.name;
            magicButton.title = button.effect;
            
            // Добавляем эффекты при нажатии
            magicButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                magicButton.style.transform = 'scale(0.9)';
                magicButton.style.boxShadow = `0 2px 10px ${button.color}`;
            });
            
            magicButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                magicButton.style.transform = 'scale(1)';
                magicButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                
                // Запускаем магический эффект
                triggerMobileMagic(button.key);
            });
            
            // Также добавляем поддержку клика мышью
            magicButton.addEventListener('click', (e) => {
                e.preventDefault();
                triggerMobileMagic(button.key);
            });
            
            mobileContainer.appendChild(magicButton);
            mobileUI.magicButtons.push(magicButton);
        });
        
        // Кнопка случайной магии
        const randomMagicButton = document.createElement('button');
        randomMagicButton.style.cssText = `
            width: 80px;
            height: 60px;
            border-radius: 30px;
            border: 3px solid #FFD700;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: #000;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            transition: all 0.3s ease;
            user-select: none;
            -webkit-user-select: none;
            -webkit-tap-highlight-color: transparent;
        `;
        randomMagicButton.textContent = '🎲 СЛУЧАЙНО';
        randomMagicButton.title = 'Случайная магия';
        
        randomMagicButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            randomMagicButton.style.transform = 'scale(0.9)';
        });
        
        randomMagicButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            randomMagicButton.style.transform = 'scale(1)';
            performMagic();
        });
        
        randomMagicButton.addEventListener('click', (e) => {
            e.preventDefault();
            performMagic();
        });
        
        mobileContainer.appendChild(randomMagicButton);
        
        // Кнопка пробивания дыр
        const punchButton = document.createElement('button');
        punchButton.style.cssText = `
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 3px solid #FF0000;
            background: radial-gradient(circle, #FF0000, #8B0000);
            color: white;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3);
            transition: all 0.3s ease;
            user-select: none;
            -webkit-user-select: none;
            -webkit-tap-highlight-color: transparent;
        `;
        punchButton.textContent = '👊';
        punchButton.title = 'Пробить дыру в реальности';
        
        punchButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            punchButton.style.transform = 'scale(0.9)';
        });
        
        punchButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            punchButton.style.transform = 'scale(1)';
            punchRealityHole();
        });
        
        punchButton.addEventListener('click', (e) => {
            e.preventDefault();
            punchRealityHole();
        });
        
        mobileContainer.appendChild(punchButton);
        
        document.body.appendChild(mobileContainer);
    }
    
    // Запуск магии с мобильной кнопки
    function triggerMobileMagic(key) {
        const magicKeys = {
            'f': () => createFireStorm(),
            'w': () => createWaterWhirlpool(),
            'e': () => createEarthquake(),
            'a': () => createWindTornado(),
            'i': () => createIceAge(),
            't': () => createThunderStorm(),
            'b': () => createBlackHole(),
            'n': () => createNebula(),
            '1': () => createTimeStop(),
            '2': () => createTimeAcceleration(),
            'r': () => createRainbow(),
            'l': () => createLightning()
        };
        
        if (magicKeys[key]) {
            magicKeys[key]();
            showMagicInfo(`Мобильная магия: ${getEffectNameByKey(key)}`);
            
            // Отправляем магию другим игрокам
            const effectName = getEffectNameByKey(key);
            if (effectName) {
                sendMagicToPlayers({ name: effectName });
            }
            
            // Создаем визуальную обратную связь
            createMobileMagicFeedback(key);
        }
    }
    
    // Создание визуальной обратной связи для мобильных
    function createMobileMagicFeedback(key) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 15px;
            font-family: Arial, sans-serif;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            z-index: 10001;
            border: 2px solid #00FF00;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            animation: mobileFeedbackAnimation 2s ease-out forwards;
        `;
        
        feedback.textContent = `✨ ${getEffectNameByKey(key)} ✨`;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('mobileFeedbackAnimation')) {
            const style = document.createElement('style');
            style.id = 'mobileFeedbackAnimation';
            style.textContent = `
                @keyframes mobileFeedbackAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.5);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }
    
    // Инициализация жестовой магии
    function initializeGestureMagic() {
        let startX, startY, startTime;
        
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                startTime = Date.now();
                mobileUI.gestureMagic.gestureStartTime = startTime;
            }
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;
            
            // Определяем жест
            const gesture = detectGesture(deltaX, deltaY, deltaTime);
            
            if (gesture) {
                executeGestureMagic(gesture);
            }
            
            // Сбрасываем значения
            startX = startY = null;
        });
    }
    
    // Определение жеста
    function detectGesture(deltaX, deltaY, deltaTime) {
        const minDistance = 50;
        const maxTime = 1000;
        
        if (deltaTime > maxTime) return null;
        
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        
        if (absX < minDistance && absY < minDistance) {
            return 'tap'; // Обычное касание
        }
        
        if (absX > absY) {
            return deltaX > 0 ? 'swipeRight' : 'swipeLeft';
        } else {
            return deltaY > 0 ? 'swipeDown' : 'swipeUp';
        }
    }
    
    // Выполнение жестовой магии
    function executeGestureMagic(gesture) {
        const gestureEffects = {
            'tap': () => createMagicExplosion(),
            'swipeUp': () => createWindTornado(),
            'swipeDown': () => createEarthquake(),
            'swipeLeft': () => createFireStorm(),
            'swipeRight': () => createWaterWhirlpool()
        };
        
        if (gestureEffects[gesture]) {
            gestureEffects[gesture]();
            showMagicInfo(`Жестовая магия: ${gesture}`);
            
            // Создаем визуальную обратную связь для жеста
            createGestureFeedback(gesture);
        }
    }
    
    // Создание визуальной обратной связи для жестов
    function createGestureFeedback(gesture) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            z-index: 10001;
            border: 2px solid #FF69B4;
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.5);
            animation: gestureFeedbackAnimation 3s ease-out forwards;
        `;
        
        const gestureNames = {
            'tap': '👆 Касание',
            'swipeUp': '⬆️ Свайп вверх',
            'swipeDown': '⬇️ Свайп вниз',
            'swipeLeft': '⬅️ Свайп влево',
            'swipeRight': '➡️ Свайп вправо'
        };
        
        feedback.textContent = `🎭 ${gestureNames[gesture] || gesture}`;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('gestureFeedbackAnimation')) {
            const style = document.createElement('style');
            style.id = 'gestureFeedbackAnimation';
            style.textContent = `
                @keyframes gestureFeedbackAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translateX(-50%) translateY(-20px);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translateX(-50%) translateY(0px);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translateX(-50%) translateY(0px);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateX(-50%) translateY(-20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 3000);
    }
    
    // Оптимизация существующих элементов для мобильных
    function optimizeForMobile() {
        // Увеличиваем размеры элементов для мобильных
        const multiplayerPanel = document.getElementById('multiplayerPanel');
        if (multiplayerPanel) {
            multiplayerPanel.style.fontSize = '14px';
            multiplayerPanel.style.padding = '20px';
            multiplayerPanel.style.minWidth = '280px';
        }
        
        // Оптимизируем чат для мобильных
        const magicChat = document.getElementById('magicChat');
        if (magicChat) {
            magicChat.style.width = '90vw';
            magicChat.style.height = '250px';
            magicChat.style.left = '5vw';
            magicChat.style.bottom = '120px'; // Поднимаем над мобильными кнопками
        }
        
        // Оптимизируем радар для мобильных
        const magicRadar = document.getElementById('magicRadar');
        if (magicRadar) {
            magicRadar.style.width = '150px';
            magicRadar.style.height = '150px';
            magicRadar.style.top = '10px';
            magicRadar.style.left = '10px';
        }
        
        // Убираем кнопку пробивания дыр (она теперь в мобильном интерфейсе)
        const punchButton = document.getElementById('punchRealityButton');
        if (punchButton) {
            punchButton.style.display = 'none';
        }
    }
    
    // Показ мобильных подсказок
    function showMobileTips() {
        const mobileTips = document.createElement('div');
        mobileTips.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 30px;
            border-radius: 20px;
            font-family: Arial, sans-serif;
            font-size: 16px;
            text-align: center;
            z-index: 10002;
            border: 3px solid #00FF00;
            box-shadow: 0 0 40px rgba(0, 255, 0, 0.5);
            max-width: 90vw;
            animation: mobileTipsAnimation 8s ease-in-out forwards;
        `;
        
        mobileTips.innerHTML = `
            <div style="color: #00FF00; font-weight: bold; font-size: 20px; margin-bottom: 20px;">
                📱 МОБИЛЬНАЯ МАГИЯ АКТИВИРОВАНА! 📱
            </div>
            <div style="margin-bottom: 15px;">
                <div style="color: #FFD700; font-weight: bold;">🎮 УПРАВЛЕНИЕ:</div>
                <div>• Кнопки внизу экрана - быстрая магия</div>
                <div>• Касание экрана - магический взрыв</div>
                <div>• Свайп вверх - ветряной торнадо</div>
                <div>• Свайп вниз - землетрясение</div>
                <div>• Свайп влево - огненный шторм</div>
                <div>• Свайп вправо - водоворот</div>
            </div>
            <div style="color: #00FFFF; font-weight: bold;">
                Наслаждайтесь магией на мобильном! ✨
            </div>
        `;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('mobileTipsAnimation')) {
            const style = document.createElement('style');
            style.id = 'mobileTipsAnimation';
            style.textContent = `
                @keyframes mobileTipsAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(mobileTips);
        
        setTimeout(() => {
            if (mobileTips.parentNode) {
                mobileTips.parentNode.removeChild(mobileTips);
            }
        }, 8000);
    }
    
    // Функция выбора эффекта с учетом весов
    function selectWeightedMagicEffect() {
        const allEffects = [];
        
        // Собираем все эффекты с учетом уровня
        Object.keys(magicEffects).forEach(category => {
            magicEffects[category].forEach(effect => {
                let adjustedWeight = effect.weight;
                
                // Увеличиваем шанс редких эффектов с уровнем
                if (category === 'rare' && magicLevel >= 3) adjustedWeight *= 1.5;
                if (category === 'epic' && magicLevel >= 5) adjustedWeight *= 2;
                if (category === 'legendary' && magicLevel >= 10) adjustedWeight *= 3;
                
                // Увеличиваем шанс при серии
                if (magicStreak >= 5) adjustedWeight *= 1.2;
                if (magicStreak >= 10) adjustedWeight *= 1.5;
                
                allEffects.push({ ...effect, weight: adjustedWeight });
            });
        });
        
        // Выбираем случайный эффект с учетом весов
        const totalWeight = allEffects.reduce((sum, effect) => sum + effect.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const effect of allEffects) {
            random -= effect.weight;
            if (random <= 0) {
                return effect;
            }
        }
        
        // Fallback
        return allEffects[Math.floor(Math.random() * allEffects.length)];
    }
    
    // Новые функции для поддержки системы магии
    
    // Создание эффекта повышения уровня
    function createLevelUpEffect() {
        const levelUpDiv = document.createElement('div');
        levelUpDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            font-weight: bold;
            color: #FFD700;
            text-shadow: 0 0 20px #FFD700;
            z-index: 10000;
            pointer-events: none;
            animation: levelUpAnimation 3s ease-out forwards;
        `;
        levelUpDiv.textContent = `УРОВЕНЬ ${magicLevel}!`;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('levelUpAnimation')) {
            const style = document.createElement('style');
            style.id = 'levelUpAnimation';
            style.textContent = `
                @keyframes levelUpAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.5);
                        filter: blur(10px);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.2);
                        filter: blur(0px);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(levelUpDiv);
        
        // Создаем взрыв частиц для повышения уровня
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #FFD700, #FFA500);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: levelUpParticle 2s ease-out forwards;
            `;
            
            const angle = (i / 50) * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            particle.style.setProperty('--endX', endX + 'px');
            particle.style.setProperty('--endY', endY + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
        
        // Добавляем CSS анимацию для частиц
        if (!document.getElementById('levelUpParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'levelUpParticleAnimation';
            style.textContent = `
                @keyframes levelUpParticle {
                    0% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (levelUpDiv.parentNode) {
                levelUpDiv.parentNode.removeChild(levelUpDiv);
            }
        }, 3000);
    }
    
    // Показ информации о магическом эффекте
    function showMagicInfo(effectName) {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 9999;
            pointer-events: none;
            animation: magicInfoAnimation 4s ease-out forwards;
            border: 2px solid #FFD700;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        `;
        infoDiv.textContent = effectName;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('magicInfoAnimation')) {
            const style = document.createElement('style');
            style.id = 'magicInfoAnimation';
            style.textContent = `
                @keyframes magicInfoAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translateX(100px);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translateX(0);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translateX(0);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translateX(100px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(infoDiv);
        
        setTimeout(() => {
            if (infoDiv.parentNode) {
                infoDiv.parentNode.removeChild(infoDiv);
            }
        }, 4000);
    }
    
    // Создание эффекта синергии
    function createSynergyEffect() {
        const synergyDiv = document.createElement('div');
        synergyDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            border: 3px solid #FF69B4;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: synergyAnimation 2s ease-out forwards;
            box-shadow: 0 0 50px #FF69B4;
        `;
        
        // Добавляем CSS анимацию
        if (!document.getElementById('synergyAnimation')) {
            const style = document.createElement('style');
            style.id = 'synergyAnimation';
            style.textContent = `
                @keyframes synergyAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0);
                        border-color: #FF69B4;
                    }
                    50% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.5);
                        border-color: #00FFFF;
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(3);
                        border-color: #FFD700;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(synergyDiv);
        
        // Создаем волны синергии
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 50px;
                    height: 50px;
                    border: 2px solid #FF69B4;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9997;
                    animation: synergyWave 1.5s ease-out forwards;
                `;
                
                document.body.appendChild(wave);
                
                setTimeout(() => {
                    if (wave.parentNode) {
                        wave.parentNode.removeChild(wave);
                    }
                }, 1500);
            }, i * 200);
        }
        
        // Добавляем CSS анимацию для волн
        if (!document.getElementById('synergyWaveAnimation')) {
            const style = document.createElement('style');
            style.id = 'synergyWaveAnimation';
            style.textContent = `
                @keyframes synergyWave {
                    0% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(0);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (synergyDiv.parentNode) {
                synergyDiv.parentNode.removeChild(synergyDiv);
            }
        }, 2000);
        
        showMagicInfo("СИНЕРГИЯ МАГИИ!");
    }
    
    // Обновление UI магии
    function updateMagicUI() {
        // Создаем или обновляем магический HUD
        let magicHUD = document.getElementById('magicHUD');
        if (!magicHUD) {
            magicHUD = document.createElement('div');
            magicHUD.id = 'magicHUD';
            magicHUD.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 15px;
                border-radius: 10px;
                font-family: Arial, sans-serif;
                font-size: 12px;
                z-index: 9999;
                border: 2px solid #FFD700;
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
                min-width: 200px;
            `;
            document.body.appendChild(magicHUD);
        }
        
        magicHUD.innerHTML = `
            <div style="color: #FFD700; font-weight: bold; margin-bottom: 10px;">⚡ МАГИЧЕСКАЯ ЭНЕРГИЯ ⚡</div>
            <div>Уровень: <span style="color: #FF69B4;">${magicLevel}</span></div>
            <div>Энергия: <span style="color: #00FFFF;">${magicEnergy}</span></div>
            <div>Опыт: <span style="color: #90EE90;">${magicExperience}/${magicLevel * 100}</span></div>
            <div>Серия: <span style="color: #FFA500;">${magicStreak}</span></div>
            <div style="margin-top: 10px; font-size: 10px; color: #CCC;">
                Следующий уровень: ${magicLevel * 100 - magicExperience} опыта
            </div>
        `;
    }
    
    // Новые элементальные магические эффекты
    
    // Огненный шторм
    function createFireStorm() {
        const fireContainer = document.createElement('div');
        fireContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
        `;
        
        // Создаем огненные частицы
        for (let i = 0; i < 100; i++) {
            const fireParticle = document.createElement('div');
            fireParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 5}px;
                height: ${Math.random() * 20 + 5}px;
                background: radial-gradient(circle, #FF4500, #FF0000, #8B0000);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: fireParticleAnimation ${Math.random() * 3 + 2}s ease-out forwards;
                box-shadow: 0 0 20px #FF4500;
            `;
            
            fireContainer.appendChild(fireParticle);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('fireParticleAnimation')) {
            const style = document.createElement('style');
            style.id = 'fireParticleAnimation';
            style.textContent = `
                @keyframes fireParticleAnimation {
                    0% { 
                        opacity: 1; 
                        transform: scale(0) rotate(0deg);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.5) rotate(180deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0.5) rotate(360deg) translateY(-100px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(fireContainer);
        
        setTimeout(() => {
            if (fireContainer.parentNode) {
                fireContainer.parentNode.removeChild(fireContainer);
            }
        }, 5000);
    }
    
    // Водоворот
    function createWaterWhirlpool() {
        const waterContainer = document.createElement('div');
        waterContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(0, 191, 255, 0.3) 0%, 
                rgba(0, 100, 200, 0.6) 50%, 
                rgba(0, 50, 150, 0.9) 100%);
            pointer-events: none;
            z-index: 9998;
            animation: whirlpoolAnimation 4s ease-out forwards;
            overflow: hidden;
        `;
        
        // Создаем водные частицы
        for (let i = 0; i < 50; i++) {
            const waterParticle = document.createElement('div');
            waterParticle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #00BFFF, #0080FF);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: waterParticleAnimation ${Math.random() * 2 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            waterContainer.appendChild(waterParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('whirlpoolAnimation')) {
            const style = document.createElement('style');
            style.id = 'whirlpoolAnimation';
            style.textContent = `
                @keyframes whirlpoolAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(2) rotate(360deg);
                    }
                }
                @keyframes waterParticleAnimation {
                    0% { 
                        transform: translate(-50%, -50%) rotate(0deg) translateX(0px);
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(360deg) translateX(150px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(waterContainer);
        
        setTimeout(() => {
            if (waterContainer.parentNode) {
                waterContainer.parentNode.removeChild(waterContainer);
            }
        }, 4000);
    }
    
    // Землетрясение
    function createEarthquake() {
        const world = document.getElementById('virtualWorld');
        if (world) {
            world.style.animation = 'earthquakeAnimation 3s ease-in-out';
        }
        
        // Создаем трещины в земле
        for (let i = 0; i < 10; i++) {
            const crack = document.createElement('div');
            crack.style.cssText = `
                position: fixed;
                width: ${Math.random() * 200 + 100}px;
                height: 4px;
                background: linear-gradient(90deg, #8B4513, #654321, #8B4513);
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 80}%;
                transform: rotate(${Math.random() * 360}deg);
                pointer-events: none;
                z-index: 9998;
                animation: crackAnimation 3s ease-out forwards;
                box-shadow: 0 0 10px #654321;
            `;
            
            document.body.appendChild(crack);
            
            setTimeout(() => {
                if (crack.parentNode) {
                    crack.parentNode.removeChild(crack);
                }
            }, 3000);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('earthquakeAnimation')) {
            const style = document.createElement('style');
            style.id = 'earthquakeAnimation';
            style.textContent = `
                @keyframes earthquakeAnimation {
                    0%, 100% { transform: translateX(0px) translateY(0px); }
                    10% { transform: translateX(-5px) translateY(2px); }
                    20% { transform: translateX(5px) translateY(-2px); }
                    30% { transform: translateX(-3px) translateY(4px); }
                    40% { transform: translateX(3px) translateY(-4px); }
                    50% { transform: translateX(-2px) translateY(1px); }
                    60% { transform: translateX(2px) translateY(-1px); }
                    70% { transform: translateX(-4px) translateY(3px); }
                    80% { transform: translateX(4px) translateY(-3px); }
                    90% { transform: translateX(-1px) translateY(2px); }
                }
                @keyframes crackAnimation {
                    0% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(0);
                    }
                    50% { 
                        opacity: 1; 
                        transform: rotate(var(--rotation)) scaleX(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: rotate(var(--rotation)) scaleX(1.5);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Ветряной торнадо
    function createWindTornado() {
        const tornadoContainer = document.createElement('div');
        tornadoContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 400px;
            pointer-events: none;
            z-index: 9998;
            animation: tornadoAnimation 5s ease-out forwards;
        `;
        
        // Создаем ветряные частицы
        for (let i = 0; i < 80; i++) {
            const windParticle = document.createElement('div');
            windParticle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 2}px;
                height: ${Math.random() * 10 + 2}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(200, 200, 200, 0.4));
                border-radius: 50%;
                left: 50%;
                top: ${Math.random() * 100}%;
                transform: translate(-50%, -50%);
                animation: windParticleAnimation ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            tornadoContainer.appendChild(windParticle);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('tornadoAnimation')) {
            const style = document.createElement('style');
            style.id = 'tornadoAnimation';
            style.textContent = `
                @keyframes tornadoAnimation {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0) rotate(0deg);
                    }
                    20% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotate(90deg);
                    }
                    80% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1.5) rotate(270deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(2) rotate(360deg);
                    }
                }
                @keyframes windParticleAnimation {
                    0% { 
                        transform: translate(-50%, -50%) rotate(0deg) translateX(0px);
                        opacity: 0;
                    }
                    25% { 
                        opacity: 1;
                    }
                    75% { 
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-50%, -50%) rotate(360deg) translateX(50px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(tornadoContainer);
        
        setTimeout(() => {
            if (tornadoContainer.parentNode) {
                tornadoContainer.parentNode.removeChild(tornadoContainer);
            }
        }, 5000);
    }
    
    // Ледниковый период
    function createIceAge() {
        const iceContainer = document.createElement('div');
        iceContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(180deg, 
                rgba(173, 216, 230, 0.1) 0%, 
                rgba(135, 206, 235, 0.2) 50%, 
                rgba(70, 130, 180, 0.3) 100%);
        `;
        
        // Создаем ледяные кристаллы
        for (let i = 0; i < 60; i++) {
            const iceCrystal = document.createElement('div');
            iceCrystal.style.cssText = `
                position: absolute;
                width: ${Math.random() * 30 + 10}px;
                height: ${Math.random() * 30 + 10}px;
                background: linear-gradient(45deg, 
                    rgba(173, 216, 230, 0.8), 
                    rgba(135, 206, 235, 0.6), 
                    rgba(70, 130, 180, 0.4));
                clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: iceCrystalAnimation ${Math.random() * 4 + 3}s ease-out forwards;
                box-shadow: 0 0 15px rgba(173, 216, 230, 0.8);
            `;
            
            iceContainer.appendChild(iceCrystal);
        }
        
        // Добавляем CSS анимацию
        if (!document.getElementById('iceCrystalAnimation')) {
            const style = document.createElement('style');
            style.id = 'iceCrystalAnimation';
            style.textContent = `
                @keyframes iceCrystalAnimation {
                    0% { 
                        opacity: 0; 
                        transform: scale(0) rotate(0deg);
                    }
                    30% { 
                        opacity: 1; 
                        transform: scale(1) rotate(120deg);
                    }
                    70% { 
                        opacity: 1; 
                        transform: scale(1.2) rotate(240deg);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0.8) rotate(360deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(iceContainer);
        
        setTimeout(() => {
            if (iceContainer.parentNode) {
                iceContainer.parentNode.removeChild(iceContainer);
            }
        }, 7000);
    }
    
    // Грозовой шторм
    function createThunderStorm() {
        const stormContainer = document.createElement('div');
        stormContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(180deg, 
                rgba(105, 105, 105, 0.3) 0%, 
                rgba(47, 79, 79, 0.5) 50%, 
                rgba(25, 25, 112, 0.7) 100%);
        `;
        
        // Создаем молнии
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const lightning = document.createElement('div');
                lightning.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: ${Math.random() * 200 + 100}px;
                    background: linear-gradient(180deg, #FFFFFF, #87CEEB, #4169E1);
                    left: ${Math.random() * 100}%;
                    top: 0;
                    animation: lightningAnimation 0.5s ease-out forwards;
                    box-shadow: 0 0 20px #FFFFFF;
                `;
                
                stormContainer.appendChild(lightning);
                
                setTimeout(() => {
                    if (lightning.parentNode) {
                        lightning.parentNode.removeChild(lightning);
                    }
                }, 500);
            }, i * 300);
        }
        
        // Создаем дождевые капли
        for (let i = 0; i < 200; i++) {
            const raindrop = document.createElement('div');
            raindrop.style.cssText = `
                position: absolute;
                width: 2px;
                height: ${Math.random() * 20 + 10}px;
                background: linear-gradient(180deg, rgba(135, 206, 235, 0.8), rgba(70, 130, 180, 0.4));
                left: ${Math.random() * 100}%;
                top: -20px;
                animation: raindropAnimation ${Math.random() * 2 + 1}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            stormContainer.appendChild(raindrop);
        }
        
        // Добавляем CSS анимации
        if (!document.getElementById('thunderStormAnimation')) {
            const style = document.createElement('style');
            style.id = 'thunderStormAnimation';
            style.textContent = `
                @keyframes lightningAnimation {
                    0% { 
                        opacity: 0; 
                        transform: scaleY(0);
                    }
                    10% { 
                        opacity: 1; 
                        transform: scaleY(1);
                    }
                    20% { 
                        opacity: 0; 
                        transform: scaleY(1);
                    }
                    30% { 
                        opacity: 1; 
                        transform: scaleY(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: scaleY(1);
                    }
                }
                @keyframes raindropAnimation {
                    0% { 
                        transform: translateY(0px);
                        opacity: 0;
                    }
                    10% { 
                        opacity: 1;
                    }
                    90% { 
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(100vh);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(stormContainer);
        
        setTimeout(() => {
            if (stormContainer.parentNode) {
                stormContainer.parentNode.removeChild(stormContainer);
            }
        }, 8000);
    }
    
    // Создание магического взрыва
    function createMagicExplosion() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                animation: magicExplosion ${1 + Math.random() * 2}s ease-out forwards;
                z-index: 1000;
            `;
            world.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 3000);
        }
    }
    
    // Смена цветов мира
    function changeWorldColors() {
        const colors = [
            'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        world.style.background = randomColor;
    }
    
    // Создание радуги
    function createRainbow() {
        const rainbow = document.createElement('div');
        rainbow.style.cssText = `
            position: absolute;
            top: 20%;
            left: 10%;
            width: 80%;
            height: 20px;
            background: linear-gradient(90deg, 
                #ff0000 0%, 
                #ff8000 16.66%, 
                #ffff00 33.33%, 
                #00ff00 50%, 
                #0080ff 66.66%, 
                #8000ff 83.33%, 
                #ff0080 100%);
            border-radius: 10px;
            animation: rainbowFloat 3s ease-in-out;
            z-index: 500;
        `;
        world.appendChild(rainbow);
        
        setTimeout(() => {
            if (rainbow.parentNode) {
                rainbow.parentNode.removeChild(rainbow);
            }
        }, 3000);
    }
    
    // Создание плавающих сердечек
    function spawnFloatingHearts() {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.style.cssText = `
                position: absolute;
                font-size: 30px;
                color: #ff6b6b;
                left: ${Math.random() * 100}%;
                top: 100%;
                pointer-events: none;
                animation: heartFloat ${2 + Math.random() * 3}s ease-out forwards;
                z-index: 500;
            `;
            heart.textContent = '💖';
            world.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }
    }
    
    // Создание молнии
    function createLightning() {
        const lightning = document.createElement('div');
        lightning.style.cssText = `
            position: absolute;
            top: 0;
            left: 50%;
            width: 4px;
            height: 100%;
            background: linear-gradient(180deg, #ffff00, #ffffff);
            box-shadow: 0 0 20px #ffff00;
            animation: lightning ${0.5 + Math.random() * 1}s ease-in-out;
            z-index: 1000;
        `;
        world.appendChild(lightning);
        
        setTimeout(() => {
            if (lightning.parentNode) {
                lightning.parentNode.removeChild(lightning);
            }
        }, 1500);
    }
    
    // Создание сокровища
    function summonTreasure() {
        const treasure = document.createElement('div');
        treasure.style.cssText = `
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 60px;
            animation: treasureAppear 2s ease-out;
            z-index: 1000;
        `;
        treasure.textContent = '💰';
        world.appendChild(treasure);
        
        setTimeout(() => {
            if (treasure.parentNode) {
                treasure.parentNode.removeChild(treasure);
            }
        }, 3000);
    }
    
    // Метеоритный дождь
    function createMeteorShower() {
        for (let i = 0; i < 8; i++) {
            const meteor = document.createElement('div');
            meteor.style.cssText = `
                position: absolute;
                width: 4px;
                height: 20px;
                background: linear-gradient(180deg, #ff6b6b, #ffa500, #ffff00);
                left: ${Math.random() * 100}%;
                top: -20px;
                pointer-events: none;
                animation: meteorFall ${1 + Math.random() * 2}s linear forwards;
                z-index: 500;
                box-shadow: 0 0 10px #ff6b6b;
            `;
            world.appendChild(meteor);
            
            setTimeout(() => {
                if (meteor.parentNode) {
                    meteor.parentNode.removeChild(meteor);
                }
            }, 3000);
        }
    }
    
    // Магические бабочки
    function spawnMagicButterflies() {
        for (let i = 0; i < 12; i++) {
            const butterfly = document.createElement('div');
            butterfly.style.cssText = `
                position: absolute;
                font-size: 25px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: butterflyFly ${3 + Math.random() * 4}s ease-in-out infinite;
                z-index: 500;
            `;
            butterfly.textContent = '🦋';
            world.appendChild(butterfly);
            
            setTimeout(() => {
                if (butterfly.parentNode) {
                    butterfly.parentNode.removeChild(butterfly);
                }
            }, 7000);
        }
    }
    
    // Северное сияние
    function createAuroraBorealis() {
        const aurora = document.createElement('div');
        aurora.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(45deg, 
                rgba(0,255,127,0.3) 0%, 
                rgba(0,191,255,0.3) 25%, 
                rgba(138,43,226,0.3) 50%, 
                rgba(255,20,147,0.3) 75%, 
                rgba(0,255,127,0.3) 100%);
            animation: auroraWave 4s ease-in-out infinite;
            z-index: 100;
            pointer-events: none;
        `;
        world.appendChild(aurora);
        
        setTimeout(() => {
            if (aurora.parentNode) {
                aurora.parentNode.removeChild(aurora);
            }
        }, 8000);
    }
    
    // Магические кристаллы
    function summonMagicCrystals() {
        for (let i = 0; i < 6; i++) {
            const crystal = document.createElement('div');
            crystal.style.cssText = `
                position: absolute;
                font-size: 40px;
                left: ${20 + Math.random() * 60}%;
                top: ${20 + Math.random() * 60}%;
                pointer-events: none;
                animation: crystalGlow ${2 + Math.random() * 2}s ease-in-out infinite;
                z-index: 500;
            `;
            crystal.textContent = '💎';
            world.appendChild(crystal);
            
            setTimeout(() => {
                if (crystal.parentNode) {
                    crystal.parentNode.removeChild(crystal);
                }
            }, 5000);
        }
    }
    
    // Торнадо
    function createTornado() {
        const tornado = document.createElement('div');
        tornado.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 200px;
            background: linear-gradient(180deg, 
                rgba(255,255,255,0.8) 0%, 
                rgba(200,200,200,0.6) 50%, 
                rgba(100,100,100,0.4) 100%);
            border-radius: 10px;
            animation: tornadoSpin 2s linear infinite;
            z-index: 500;
            pointer-events: none;
        `;
        world.appendChild(tornado);
        
        setTimeout(() => {
            if (tornado.parentNode) {
                tornado.parentNode.removeChild(tornado);
            }
        }, 4000);
    }
    
    // Дополнительные плавающие острова
    function spawnFloatingIslands() {
        for (let i = 0; i < 3; i++) {
            const island = document.createElement('div');
            island.style.cssText = `
                position: absolute;
                width: ${80 + Math.random() * 120}px;
                height: ${40 + Math.random() * 80}px;
                background: linear-gradient(45deg, #8B4513, #A0522D, #CD853F);
                border-radius: 50%;
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 80}%;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: islandFloat ${4 + Math.random() * 3}s infinite ease-in-out;
                z-index: 200;
            `;
            world.appendChild(island);
            
            setTimeout(() => {
                if (island.parentNode) {
                    island.parentNode.removeChild(island);
                }
            }, 8000);
        }
    }
    
    // Магический портал
    function createMagicPortal() {
        const portal = document.createElement('div');
        portal.style.cssText = `
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(255,255,255,0.3) 0%, 
                rgba(0,0,0,0.8) 50%, 
                rgba(0,0,0,0.95) 100%);
            animation: portalSpin 3s linear infinite;
            z-index: 1000;
            pointer-events: none;
            border: 3px solid #ff6b6b;
        `;
        world.appendChild(portal);
        
        setTimeout(() => {
            if (portal.parentNode) {
                portal.parentNode.removeChild(portal);
            }
        }, 5000);
    }
    
    // Дракон
    function summonDragon() {
        const dragon = document.createElement('div');
        dragon.style.cssText = `
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 80px;
            animation: dragonFly 4s ease-in-out;
            z-index: 1000;
            pointer-events: none;
        `;
        dragon.textContent = '🐉';
        world.appendChild(dragon);
        
        setTimeout(() => {
            if (dragon.parentNode) {
                dragon.parentNode.removeChild(dragon);
            }
        }, 4000);
    }
    
    // Фейерверк
    function createFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.cssText = `
                    position: absolute;
                    left: ${20 + Math.random() * 60}%;
                    top: ${20 + Math.random() * 60}%;
                    width: 6px;
                    height: 6px;
                    background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'][Math.floor(Math.random() * 5)]};
                    border-radius: 50%;
                    animation: fireworkExplode 2s ease-out forwards;
                    z-index: 1000;
                    pointer-events: none;
                `;
                world.appendChild(firework);
                
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 2000);
            }, i * 500);
        }
    }
    
    // Магические цветы
    function spawnMagicFlowers() {
        for (let i = 0; i < 10; i++) {
            const flower = document.createElement('div');
            flower.style.cssText = `
                position: absolute;
                font-size: 30px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: flowerBloom ${2 + Math.random() * 2}s ease-in-out infinite;
                z-index: 500;
            `;
            flower.textContent = '🌸';
            world.appendChild(flower);
            
            setTimeout(() => {
                if (flower.parentNode) {
                    flower.parentNode.removeChild(flower);
                }
            }, 6000);
        }
    }
    
    // Ультимативная магия (комбинированный эффект)
    function createUltimateMagic() {
        // Создаем все эффекты одновременно
        createRainbow();
        spawnFloatingHearts();
        createLightning();
        summonMagicCrystals();
        spawnMagicButterflies();
        
        // Создаем особый эффект
        const ultimateEffect = document.createElement('div');
        ultimateEffect.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, 
                rgba(255,255,255,0.8) 0%, 
                rgba(255,107,107,0.6) 25%, 
                rgba(78,205,196,0.6) 50%, 
                rgba(69,183,209,0.6) 75%, 
                rgba(249,202,36,0.6) 100%);
            animation: ultimatePulse 3s ease-in-out infinite;
            z-index: 1500;
            pointer-events: none;
        `;
        world.appendChild(ultimateEffect);
        
        setTimeout(() => {
            if (ultimateEffect.parentNode) {
                ultimateEffect.parentNode.removeChild(ultimateEffect);
            }
        }, 5000);
    }
    
    // Магический шторм
    function createMagicStorm() {
        // Создаем молнии
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createLightning(), i * 800);
        }
        
        // Создаем дождь из магии
        for (let i = 0; i < 20; i++) {
            const magicDrop = document.createElement('div');
            magicDrop.style.cssText = `
                position: absolute;
                width: 3px;
                height: 15px;
                background: linear-gradient(180deg, #4ecdc4, #45b7d1);
                left: ${Math.random() * 100}%;
                top: -15px;
                pointer-events: none;
                animation: magicRain ${1 + Math.random() * 2}s linear forwards;
                z-index: 500;
                box-shadow: 0 0 5px #4ecdc4;
            `;
            world.appendChild(magicDrop);
            
            setTimeout(() => {
                if (magicDrop.parentNode) {
                    magicDrop.parentNode.removeChild(magicDrop);
                }
            }, 3000);
        }
        
        // Создаем ветер
        const wind = document.createElement('div');
        wind.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.1) 50%, 
                transparent 100%);
            animation: windBlow 2s ease-in-out infinite;
            z-index: 100;
            pointer-events: none;
        `;
        world.appendChild(wind);
        
        setTimeout(() => {
            if (wind.parentNode) {
                wind.parentNode.removeChild(wind);
            }
        }, 4000);
    }
    
    // Магические существа
    function summonMagicBeasts() {
        const beasts = ['🦄', '🐲', '🦅', '🐺', '🦁', '🐯', '🦊', '🐻'];
        
        for (let i = 0; i < 6; i++) {
            const beast = document.createElement('div');
            beast.style.cssText = `
                position: absolute;
                font-size: 35px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: beastRoam ${4 + Math.random() * 3}s ease-in-out infinite;
                z-index: 500;
            `;
            beast.textContent = beasts[Math.floor(Math.random() * beasts.length)];
            world.appendChild(beast);
            
            setTimeout(() => {
                if (beast.parentNode) {
                    beast.parentNode.removeChild(beast);
                }
            }, 7000);
        }
    }
    
    // Галактика
    function createGalaxy() {
        // Создаем спиральную галактику
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: ${1 + Math.random() * 3}px;
                height: ${1 + Math.random() * 3}px;
                background: white;
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: galaxySpin ${10 + Math.random() * 20}s linear infinite;
                z-index: 100;
            `;
            world.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 30000);
        }
        
        // Центральное ядро галактики
        const core = document.createElement('div');
        core.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #ffff00, #ff6b6b, #000000);
            border-radius: 50%;
            animation: galaxyCore 5s ease-in-out infinite;
            z-index: 200;
            pointer-events: none;
        `;
        world.appendChild(core);
        
        setTimeout(() => {
            if (core.parentNode) {
                core.parentNode.removeChild(core);
            }
        }, 10000);
    }
    
    // Магический лес
    function spawnMagicForest() {
        for (let i = 0; i < 15; i++) {
            const tree = document.createElement('div');
            tree.style.cssText = `
                position: absolute;
                font-size: ${30 + Math.random() * 40}px;
                left: ${Math.random() * 100}%;
                top: ${60 + Math.random() * 40}%;
                pointer-events: none;
                animation: treeGrow ${3 + Math.random() * 2}s ease-out;
                z-index: 300;
            `;
            tree.textContent = '🌲';
            world.appendChild(tree);
            
            setTimeout(() => {
                if (tree.parentNode) {
                    tree.parentNode.removeChild(tree);
                }
            }, 8000);
        }
        
        // Магические грибы
        for (let i = 0; i < 8; i++) {
            const mushroom = document.createElement('div');
            mushroom.style.cssText = `
                position: absolute;
                font-size: 25px;
                left: ${Math.random() * 100}%;
                top: ${70 + Math.random() * 30}%;
                pointer-events: none;
                animation: mushroomGlow ${2 + Math.random() * 2}s ease-in-out infinite;
                z-index: 250;
            `;
            mushroom.textContent = '🍄';
            world.appendChild(mushroom);
            
            setTimeout(() => {
                if (mushroom.parentNode) {
                    mushroom.parentNode.removeChild(mushroom);
                }
            }, 6000);
        }
    }
    
    // Искажение времени
    function createTimeWarp() {
        const timeWarp = document.createElement('div');
        timeWarp.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                transparent 0%, 
                rgba(255,0,255,0.1) 30%, 
                rgba(0,255,255,0.2) 60%, 
                rgba(255,255,0,0.1) 100%);
            animation: timeWarpDistort 4s ease-in-out infinite;
            z-index: 1000;
            pointer-events: none;
        `;
        world.appendChild(timeWarp);
        
        // Создаем временные кольца
        for (let i = 0; i < 5; i++) {
            const ring = document.createElement('div');
            ring.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: ${100 + i * 50}px;
                height: ${100 + i * 50}px;
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                animation: timeRing ${2 + i * 0.5}s linear infinite;
                z-index: 1001;
                pointer-events: none;
            `;
            world.appendChild(ring);
            
            setTimeout(() => {
                if (ring.parentNode) {
                    ring.parentNode.removeChild(ring);
                }
            }, 6000);
        }
        
        setTimeout(() => {
            if (timeWarp.parentNode) {
                timeWarp.parentNode.removeChild(timeWarp);
            }
        }, 8000);
    }
    
    // Элементали
    function summonElementals() {
        const elementals = [
            { emoji: '🔥', name: 'Огненный', color: '#ff6b6b' },
            { emoji: '💧', name: 'Водный', color: '#4ecdc4' },
            { emoji: '🌪️', name: 'Воздушный', color: '#45b7d1' },
            { emoji: '🌍', name: 'Земной', color: '#8B4513' }
        ];
        
        elementals.forEach((elemental, index) => {
            const elementalDiv = document.createElement('div');
            elementalDiv.style.cssText = `
                position: absolute;
                font-size: 50px;
                left: ${20 + index * 20}%;
                top: 30%;
                pointer-events: none;
                animation: elementalSummon ${3 + index * 0.5}s ease-out;
                z-index: 500;
                text-shadow: 0 0 20px ${elemental.color};
            `;
            elementalDiv.textContent = elemental.emoji;
            world.appendChild(elementalDiv);
            
            setTimeout(() => {
                if (elementalDiv.parentNode) {
                    elementalDiv.parentNode.removeChild(elementalDiv);
                }
            }, 5000);
        });
    }
    
    // Магический океан
    function createMagicOcean() {
        // Создаем волны
        for (let i = 0; i < 8; i++) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                bottom: ${i * 10}%;
                left: 0;
                width: 100%;
                height: 20px;
                background: linear-gradient(90deg, 
                    transparent 0%, 
                    rgba(0,191,255,0.3) 50%, 
                    transparent 100%);
                animation: waveMove ${2 + i * 0.3}s ease-in-out infinite;
                z-index: 200;
                pointer-events: none;
            `;
            world.appendChild(wave);
            
            setTimeout(() => {
                if (wave.parentNode) {
                    wave.parentNode.removeChild(wave);
                }
            }, 8000);
        }
        
        // Морские существа
        const seaCreatures = ['🐠', '🐙', '🦑', '🐚', '🦀', '🐡'];
        for (let i = 0; i < 10; i++) {
            const creature = document.createElement('div');
            creature.style.cssText = `
                position: absolute;
                font-size: 30px;
                left: ${Math.random() * 100}%;
                top: ${50 + Math.random() * 50}%;
                pointer-events: none;
                animation: seaSwim ${3 + Math.random() * 3}s ease-in-out infinite;
                z-index: 300;
            `;
            creature.textContent = seaCreatures[Math.floor(Math.random() * seaCreatures.length)];
            world.appendChild(creature);
            
            setTimeout(() => {
                if (creature.parentNode) {
                    creature.parentNode.removeChild(creature);
                }
            }, 6000);
        }
    }
    
    // Космические существа
    function spawnCosmicBeings() {
        const cosmicBeings = ['👽', '🛸', '🌌', '⭐', '🌟', '💫', '🌠'];
        
        for (let i = 0; i < 12; i++) {
            const being = document.createElement('div');
            being.style.cssText = `
                position: absolute;
                font-size: 35px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: cosmicFloat ${4 + Math.random() * 4}s ease-in-out infinite;
                z-index: 500;
            `;
            being.textContent = cosmicBeings[Math.floor(Math.random() * cosmicBeings.length)];
            world.appendChild(being);
            
            setTimeout(() => {
                if (being.parentNode) {
                    being.parentNode.removeChild(being);
                }
            }, 8000);
        }
    }
    
    // Разрыв измерений
    function createDimensionRift() {
        const rift = document.createElement('div');
        rift.style.cssText = `
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 60%;
            background: linear-gradient(180deg, 
                #ff0000 0%, 
                #00ff00 25%, 
                #0000ff 50%, 
                #ffff00 75%, 
                #ff00ff 100%);
            animation: dimensionRift 3s ease-in-out infinite;
            z-index: 1000;
            pointer-events: none;
            box-shadow: 0 0 30px #ffffff;
        `;
        world.appendChild(rift);
        
        // Создаем искажения вокруг разрыва
        for (let i = 0; i < 10; i++) {
            const distortion = document.createElement('div');
            distortion.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 40}px;
                height: ${20 + Math.random() * 40}px;
                border: 2px solid rgba(255,255,255,0.5);
                border-radius: 50%;
                left: ${45 + Math.random() * 10}%;
                top: ${20 + Math.random() * 60}%;
                animation: dimensionDistort ${1 + Math.random() * 2}s ease-in-out infinite;
                z-index: 999;
                pointer-events: none;
            `;
            world.appendChild(distortion);
            
            setTimeout(() => {
                if (distortion.parentNode) {
                    distortion.parentNode.removeChild(distortion);
                }
            }, 5000);
        }
        
        setTimeout(() => {
            if (rift.parentNode) {
                rift.parentNode.removeChild(rift);
            }
        }, 6000);
    }
    
    // Феникс
    function summonPhoenix() {
        const phoenix = document.createElement('div');
        phoenix.style.cssText = `
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 80px;
            animation: phoenixRise 5s ease-in-out;
            z-index: 1000;
            pointer-events: none;
            text-shadow: 0 0 30px #ff6b6b;
        `;
        phoenix.textContent = '🔥';
        world.appendChild(phoenix);
        
        // Создаем огненные частицы
        for (let i = 0; i < 20; i++) {
            const fireParticle = document.createElement('div');
            fireParticle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #ff6b6b;
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                animation: fireParticle ${2 + Math.random() * 2}s ease-out forwards;
                z-index: 999;
            `;
            world.appendChild(fireParticle);
            
            setTimeout(() => {
                if (fireParticle.parentNode) {
                    fireParticle.parentNode.removeChild(fireParticle);
                }
            }, 4000);
        }
        
        setTimeout(() => {
            if (phoenix.parentNode) {
                phoenix.parentNode.removeChild(phoenix);
            }
        }, 5000);
    }
    
    // Магическая гора
    function createMagicMountain() {
        const mountain = document.createElement('div');
        mountain.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 200px solid transparent;
            border-right: 200px solid transparent;
            border-bottom: 300px solid #8B4513;
            animation: mountainRise 3s ease-out;
            z-index: 400;
            pointer-events: none;
        `;
        world.appendChild(mountain);
        
        // Снежная шапка
        const snowCap = document.createElement('div');
        snowCap.style.cssText = `
            position: absolute;
            bottom: 250px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-right: 100px solid transparent;
            border-bottom: 100px solid white;
            animation: snowCapAppear 2s ease-out 1s both;
            z-index: 401;
            pointer-events: none;
        `;
        world.appendChild(snowCap);
        
        setTimeout(() => {
            if (mountain.parentNode) {
                mountain.parentNode.removeChild(mountain);
            }
            if (snowCap.parentNode) {
                snowCap.parentNode.removeChild(snowCap);
            }
        }, 8000);
    }
    
    // Звездная пыль
    function spawnStardust() {
        for (let i = 0; i < 100; i++) {
            const dust = document.createElement('div');
            dust.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: stardustTwinkle ${1 + Math.random() * 3}s ease-in-out infinite;
                z-index: 100;
            `;
            world.appendChild(dust);
            
            setTimeout(() => {
                if (dust.parentNode) {
                    dust.parentNode.removeChild(dust);
                }
            }, 10000);
        }
    }
    
    // Магический город
    function createMagicCity() {
        const buildings = ['🏰', '🏛️', '🏢', '🏪', '🏬', '🏭'];
        
        for (let i = 0; i < 8; i++) {
            const building = document.createElement('div');
            building.style.cssText = `
                position: absolute;
                font-size: ${40 + Math.random() * 30}px;
                left: ${10 + i * 12}%;
                bottom: 0;
                pointer-events: none;
                animation: buildingRise ${2 + Math.random() * 2}s ease-out;
                z-index: 300;
            `;
            building.textContent = buildings[Math.floor(Math.random() * buildings.length)];
            world.appendChild(building);
            
            setTimeout(() => {
                if (building.parentNode) {
                    building.parentNode.removeChild(building);
                }
            }, 8000);
        }
        
        // Магические огни в окнах
        for (let i = 0; i < 20; i++) {
            const light = document.createElement('div');
            light.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffff00;
                border-radius: 50%;
                left: ${15 + Math.random() * 70}%;
                bottom: ${20 + Math.random() * 60}%;
                pointer-events: none;
                animation: windowLight ${1 + Math.random() * 2}s ease-in-out infinite;
                z-index: 301;
                box-shadow: 0 0 10px #ffff00;
            `;
            world.appendChild(light);
            
            setTimeout(() => {
                if (light.parentNode) {
                    light.parentNode.removeChild(light);
                }
            }, 6000);
        }
    }
    
    // Древние духи
    function summonAncientSpirits() {
        const spirits = ['👻', '🧙‍♂️', '🧙‍♀️', '🔮', '✨', '🌟'];
        
        for (let i = 0; i < 8; i++) {
            const spirit = document.createElement('div');
            spirit.style.cssText = `
                position: absolute;
                font-size: 40px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: spiritFloat ${3 + Math.random() * 3}s ease-in-out infinite;
                z-index: 500;
                opacity: 0.8;
            `;
            spirit.textContent = spirits[Math.floor(Math.random() * spirits.length)];
            world.appendChild(spirit);
            
            setTimeout(() => {
                if (spirit.parentNode) {
                    spirit.parentNode.removeChild(spirit);
                }
            }, 8000);
        }
    }
    
    // Эпическая битва
    function createEpicBattle() {
        // Создаем воинов
        const warriors = ['⚔️', '🛡️', '🏹', '🗡️', '⚡', '🔥'];
        
        for (let i = 0; i < 6; i++) {
            const warrior = document.createElement('div');
            warrior.style.cssText = `
                position: absolute;
                font-size: 50px;
                left: ${20 + i * 15}%;
                top: 40%;
                pointer-events: none;
                animation: battleFight ${2 + Math.random() * 2}s ease-in-out infinite;
                z-index: 500;
            `;
            warrior.textContent = warriors[i];
            world.appendChild(warrior);
            
            setTimeout(() => {
                if (warrior.parentNode) {
                    warrior.parentNode.removeChild(warrior);
                }
            }, 5000);
        }
        
        // Эффекты взрывов
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const explosion = document.createElement('div');
                explosion.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, #ff6b6b, #ffa500);
                    border-radius: 50%;
                    left: ${30 + Math.random() * 40}%;
                    top: ${30 + Math.random() * 40}%;
                    pointer-events: none;
                    animation: battleExplosion 1s ease-out forwards;
                    z-index: 600;
                `;
                world.appendChild(explosion);
                
                setTimeout(() => {
                    if (explosion.parentNode) {
                        explosion.parentNode.removeChild(explosion);
                    }
                }, 1000);
            }, i * 500);
        }
    }
    
    // Магический сад
    function spawnMagicGarden() {
        const gardenElements = ['🌹', '🌻', '🌺', '🌷', '🌿', '🍀', '🌱', '🌾'];
        
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.style.cssText = `
                position: absolute;
                font-size: ${20 + Math.random() * 25}px;
                left: ${Math.random() * 100}%;
                top: ${60 + Math.random() * 40}%;
                pointer-events: none;
                animation: gardenBloom ${2 + Math.random() * 3}s ease-in-out infinite;
                z-index: 300;
            `;
            element.textContent = gardenElements[Math.floor(Math.random() * gardenElements.length)];
            world.appendChild(element);
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 8000);
        }
    }
    
    // Искажение реальности
    function createRealityBend() {
        const realityBend = document.createElement('div');
        realityBend.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(255,0,255,0.1) 0%, 
                rgba(0,255,255,0.1) 25%, 
                rgba(255,255,0,0.1) 50%, 
                rgba(255,0,0,0.1) 75%, 
                rgba(0,255,0,0.1) 100%);
            animation: realityBend 3s ease-in-out infinite;
            z-index: 1000;
            pointer-events: none;
        `;
        world.appendChild(realityBend);
        
        // Создаем искажения
        for (let i = 0; i < 15; i++) {
            const distortion = document.createElement('div');
            distortion.style.cssText = `
                position: absolute;
                width: ${30 + Math.random() * 50}px;
                height: ${30 + Math.random() * 50}px;
                border: 3px solid rgba(255,255,255,0.3);
                border-radius: ${Math.random() * 50}%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: realityDistort ${2 + Math.random() * 2}s ease-in-out infinite;
                z-index: 1001;
                pointer-events: none;
            `;
            world.appendChild(distortion);
            
            setTimeout(() => {
                if (distortion.parentNode) {
                    distortion.parentNode.removeChild(distortion);
                }
            }, 6000);
        }
        
        setTimeout(() => {
            if (realityBend.parentNode) {
                realityBend.parentNode.removeChild(realityBend);
            }
        }, 8000);
    }
    
    // Мега-зверь
    function summonMegaBeast() {
        const megaBeast = document.createElement('div');
        megaBeast.style.cssText = `
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 120px;
            animation: megaBeastRoar 4s ease-in-out;
            z-index: 1000;
            pointer-events: none;
            text-shadow: 0 0 50px #ff6b6b;
        `;
        megaBeast.textContent = '🐲';
        world.appendChild(megaBeast);
        
        // Создаем ударную волну
        for (let i = 0; i < 5; i++) {
            const shockwave = document.createElement('div');
            shockwave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: ${100 + i * 100}px;
                height: ${100 + i * 100}px;
                border: 3px solid rgba(255,255,255,0.5);
                border-radius: 50%;
                animation: shockwave ${1 + i * 0.2}s ease-out forwards;
                z-index: 999;
                pointer-events: none;
            `;
            world.appendChild(shockwave);
            
            setTimeout(() => {
                if (shockwave.parentNode) {
                    shockwave.parentNode.removeChild(shockwave);
                }
            }, 2000);
        }
        
        setTimeout(() => {
            if (megaBeast.parentNode) {
                megaBeast.parentNode.removeChild(megaBeast);
            }
        }, 4000);
    }
    
    // Бесконечная магия
    function createInfiniteMagic() {
        // Создаем все эффекты одновременно в цикле
        const allEffects = [
            createRainbow, spawnFloatingHearts, createLightning, 
            summonMagicCrystals, spawnMagicButterflies, createFireworks,
            spawnStardust, summonElementals, createAuroraBorealis
        ];
        
        // Запускаем эффекты в случайном порядке
        allEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 1000);
        });
        
        // Создаем бесконечный портал
        const infinitePortal = document.createElement('div');
        infinitePortal.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: conic-gradient(
                #ff0000, #ff8000, #ffff00, #80ff00, 
                #00ff00, #00ff80, #00ffff, #0080ff, 
                #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000
            );
            animation: infiniteSpin 2s linear infinite;
            z-index: 1500;
            pointer-events: none;
        `;
        world.appendChild(infinitePortal);
        
        setTimeout(() => {
            if (infinitePortal.parentNode) {
                infinitePortal.parentNode.removeChild(infinitePortal);
            }
        }, 15000);
    }
    
    // Хаотическое царство
    function createChaosRealm() {
        // Создаем хаотические частицы
        for (let i = 0; i < 200; i++) {
            const chaosParticle = document.createElement('div');
            chaosParticle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 6}px;
                height: ${2 + Math.random() * 6}px;
                background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: chaosFloat ${1 + Math.random() * 4}s ease-in-out infinite;
                z-index: 100;
            `;
            world.appendChild(chaosParticle);
            
            setTimeout(() => {
                if (chaosParticle.parentNode) {
                    chaosParticle.parentNode.removeChild(chaosParticle);
                }
            }, 15000);
        }
        
        // Хаотические символы
        const chaosSymbols = ['⚡', '🔥', '💥', '🌟', '🌀', '💫', '✨', '💢'];
        for (let i = 0; i < 30; i++) {
            const symbol = document.createElement('div');
            symbol.style.cssText = `
                position: absolute;
                font-size: ${30 + Math.random() * 50}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: chaosSpin ${2 + Math.random() * 3}s linear infinite;
                z-index: 500;
            `;
            symbol.textContent = chaosSymbols[Math.floor(Math.random() * chaosSymbols.length)];
            world.appendChild(symbol);
            
            setTimeout(() => {
                if (symbol.parentNode) {
                    symbol.parentNode.removeChild(symbol);
                }
            }, 10000);
        }
    }
    
    // Создание вселенной
    function spawnUniverse() {
        // Создаем галактики
        for (let i = 0; i < 20; i++) {
            const galaxy = document.createElement('div');
            galaxy.style.cssText = `
                position: absolute;
                width: ${50 + Math.random() * 100}px;
                height: ${50 + Math.random() * 100}px;
                background: radial-gradient(circle, 
                    rgba(255,255,255,0.8) 0%, 
                    rgba(255,0,255,0.6) 30%, 
                    rgba(0,0,0,0.8) 100%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: universeExpand ${5 + Math.random() * 5}s ease-out;
                z-index: 200;
            `;
            world.appendChild(galaxy);
            
            setTimeout(() => {
                if (galaxy.parentNode) {
                    galaxy.parentNode.removeChild(galaxy);
                }
            }, 15000);
        }
        
        // Создаем звезды
        for (let i = 0; i < 500; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                width: 1px;
                height: 1px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: starBirth ${3 + Math.random() * 7}s ease-out;
                z-index: 100;
            `;
            world.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 20000);
        }
    }
    
    // Временной парадокс
    function createTimeParadox() {
        // Создаем временные петли
        for (let i = 0; i < 10; i++) {
            const timeLoop = document.createElement('div');
            timeLoop.style.cssText = `
                position: absolute;
                width: ${100 + i * 50}px;
                height: ${100 + i * 50}px;
                border: 3px solid rgba(255,255,0,0.8);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: timeLoop ${2 + i * 0.3}s linear infinite;
                z-index: 1000;
            `;
            world.appendChild(timeLoop);
            
            setTimeout(() => {
                if (timeLoop.parentNode) {
                    timeLoop.parentNode.removeChild(timeLoop);
                }
            }, 8000);
        }
        
        // Временные искажения
        const timeDistortions = document.createElement('div');
        timeDistortions.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: conic-gradient(
                rgba(255,0,255,0.1) 0deg,
                rgba(0,255,255,0.1) 60deg,
                rgba(255,255,0,0.1) 120deg,
                rgba(255,0,0,0.1) 180deg,
                rgba(0,255,0,0.1) 240deg,
                rgba(0,0,255,0.1) 300deg,
                rgba(255,0,255,0.1) 360deg
            );
            animation: timeParadox 4s ease-in-out infinite;
            z-index: 1000;
            pointer-events: none;
        `;
        world.appendChild(timeDistortions);
        
        setTimeout(() => {
            if (timeDistortions.parentNode) {
                timeDistortions.parentNode.removeChild(timeDistortions);
            }
        }, 10000);
    }
    
    // Призыв богов
    function summonGods() {
        const gods = ['⚡', '🔥', '💧', '🌍', '🌪️', '☀️', '🌙', '⭐'];
        
        for (let i = 0; i < 8; i++) {
            const god = document.createElement('div');
            god.style.cssText = `
                position: absolute;
                font-size: 80px;
                left: ${10 + i * 12}%;
                top: 20%;
                pointer-events: none;
                animation: godSummon ${4 + i * 0.5}s ease-out;
                z-index: 1000;
                text-shadow: 0 0 50px #ffffff;
            `;
            god.textContent = gods[i];
            world.appendChild(god);
            
            setTimeout(() => {
                if (god.parentNode) {
                    god.parentNode.removeChild(god);
                }
            }, 8000);
        }
        
        // Божественная аура
        const divineAura = document.createElement('div');
        divineAura.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(255,255,255,0.2) 0%, 
                rgba(255,215,0,0.1) 50%, 
                transparent 100%);
            animation: divineGlow 3s ease-in-out infinite;
            z-index: 500;
            pointer-events: none;
        `;
        world.appendChild(divineAura);
        
        setTimeout(() => {
            if (divineAura.parentNode) {
                divineAura.parentNode.removeChild(divineAura);
            }
        }, 10000);
    }
    
    // Мультивселенная
    function createMultiverse() {
        // Создаем параллельные миры
        for (let i = 0; i < 15; i++) {
            const universe = document.createElement('div');
            universe.style.cssText = `
                position: absolute;
                width: 80%;
                height: 80%;
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: multiverseFloat ${3 + i * 0.2}s ease-in-out infinite;
                z-index: ${100 + i};
                background: radial-gradient(circle, 
                    rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.1) 0%, 
                    transparent 100%);
            `;
            world.appendChild(universe);
            
            setTimeout(() => {
                if (universe.parentNode) {
                    universe.parentNode.removeChild(universe);
                }
            }, 12000);
        }
    }
    
    // Ломатель реальности
    function spawnRealityBreaker() {
        // Создаем трещины в реальности
        for (let i = 0; i < 20; i++) {
            const crack = document.createElement('div');
            crack.style.cssText = `
                position: absolute;
                width: ${100 + Math.random() * 200}px;
                height: 4px;
                background: linear-gradient(90deg, 
                    transparent 0%, 
                    #ff0000 50%, 
                    transparent 100%);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: realityCrack ${2 + Math.random() * 3}s ease-out;
                z-index: 1000;
                transform: rotate(${Math.random() * 360}deg);
            `;
            world.appendChild(crack);
            
            setTimeout(() => {
                if (crack.parentNode) {
                    crack.parentNode.removeChild(crack);
                }
            }, 8000);
        }
        
        // Эффект ломания
        const realityBreak = document.createElement('div');
        realityBreak.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,0,0,0.1) 10px,
                rgba(255,0,0,0.1) 20px
            );
            animation: realityBreak 2s ease-in-out infinite;
            z-index: 1000;
            pointer-events: none;
        `;
        world.appendChild(realityBreak);
        
        setTimeout(() => {
            if (realityBreak.parentNode) {
                realityBreak.parentNode.removeChild(realityBreak);
            }
        }, 10000);
    }
    
    // Магический апокалипсис
    function createMagicApocalypse() {
        // Создаем апокалиптические эффекты
        const apocalypseEffects = [
            () => createMeteorShower(),
            () => createLightning(),
            () => createTornado(),
            () => createFireworks(),
            () => spawnMagicCrystals()
        ];
        
        // Запускаем все эффекты одновременно
        apocalypseEffects.forEach((effect, index) => {
            setTimeout(() => effect(), index * 500);
        });
        
        // Апокалиптический фон
        const apocalypseBg = document.createElement('div');
        apocalypseBg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(255,0,0,0.3) 0%, 
                rgba(255,100,0,0.2) 50%, 
                rgba(0,0,0,0.5) 100%);
            animation: apocalypseGlow 3s ease-in-out infinite;
            z-index: 100;
            pointer-events: none;
        `;
        world.appendChild(apocalypseBg);
        
        setTimeout(() => {
            if (apocalypseBg.parentNode) {
                apocalypseBg.parentNode.removeChild(apocalypseBg);
            }
        }, 15000);
    }
    
    // Древние ужасы
    function summonEldritchHorrors() {
        const horrors = ['👁️', '🦑', '🐙', '🕷️', '🦂', '🦇', '👹', '👺'];
        
        for (let i = 0; i < 12; i++) {
            const horror = document.createElement('div');
            horror.style.cssText = `
                position: absolute;
                font-size: 60px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: eldritchFloat ${4 + Math.random() * 4}s ease-in-out infinite;
                z-index: 500;
                filter: hue-rotate(${Math.random() * 360}deg);
            `;
            horror.textContent = horrors[Math.floor(Math.random() * horrors.length)];
            world.appendChild(horror);
            
            setTimeout(() => {
                if (horror.parentNode) {
                    horror.parentNode.removeChild(horror);
                }
            }, 10000);
        }
        
        // Эффект ужаса
        const horrorAura = document.createElement('div');
        horrorAura.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(0,0,0,0.3) 0%, 
                rgba(100,0,100,0.2) 50%, 
                rgba(0,0,0,0.6) 100%);
            animation: horrorPulse 2s ease-in-out infinite;
            z-index: 100;
            pointer-events: none;
        `;
        world.appendChild(horrorAura);
        
        setTimeout(() => {
            if (horrorAura.parentNode) {
                horrorAura.parentNode.removeChild(horrorAura);
            }
        }, 12000);
    }
    
    // Коллапс измерений
    function createDimensionCollapse() {
        // Создаем коллапсирующие измерения
        for (let i = 0; i < 8; i++) {
            const dimension = document.createElement('div');
            dimension.style.cssText = `
                position: absolute;
                width: ${200 - i * 20}px;
                height: ${200 - i * 20}px;
                border: 3px solid rgba(255,255,255,0.5);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: dimensionCollapse ${1 + i * 0.2}s ease-in forwards;
                z-index: ${1000 - i * 100};
            `;
            world.appendChild(dimension);
            
            setTimeout(() => {
                if (dimension.parentNode) {
                    dimension.parentNode.removeChild(dimension);
                }
            }, 5000);
        }
    }
    
    // Космические сущности
    function spawnCosmicEntities() {
        const entities = ['🌌', '⭐', '🌟', '💫', '🌠', '☄️', '🛸', '👽'];
        
        for (let i = 0; i < 20; i++) {
            const entity = document.createElement('div');
            entity.style.cssText = `
                position: absolute;
                font-size: ${40 + Math.random() * 40}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: cosmicEntity ${5 + Math.random() * 5}s ease-in-out infinite;
                z-index: 500;
                text-shadow: 0 0 30px #ffffff;
            `;
            entity.textContent = entities[Math.floor(Math.random() * entities.length)];
            world.appendChild(entity);
            
            setTimeout(() => {
                if (entity.parentNode) {
                    entity.parentNode.removeChild(entity);
                }
            }, 15000);
        }
    }
    
    // Магический Большой взрыв
    function createMagicBigBang() {
        // Создаем взрыв
        const bigBang = document.createElement('div');
        bigBang.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0px;
            height: 0px;
            background: radial-gradient(circle, 
                #ffffff 0%, 
                #ffff00 20%, 
                #ff6b6b 40%, 
                #4ecdc4 60%, 
                #45b7d1 80%, 
                #000000 100%);
            border-radius: 50%;
            animation: bigBang 5s ease-out forwards;
            z-index: 2000;
            pointer-events: none;
        `;
        world.appendChild(bigBang);
        
        // Создаем частицы взрыва
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${['#ffffff', '#ffff00', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                animation: bigBangParticle ${3 + Math.random() * 2}s ease-out forwards;
                z-index: 1500;
            `;
            world.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }
        
        setTimeout(() => {
            if (bigBang.parentNode) {
                bigBang.parentNode.removeChild(bigBang);
            }
        }, 5000);
    }
    
    // Бесконечные драконы
    function summonInfiniteDragons() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const dragon = document.createElement('div');
                dragon.style.cssText = `
                    position: absolute;
                    font-size: ${60 + Math.random() * 40}px;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: infiniteDragon ${4 + Math.random() * 4}s ease-in-out infinite;
                    z-index: 500;
                    text-shadow: 0 0 30px #ff6b6b;
                `;
                dragon.textContent = '🐉';
                world.appendChild(dragon);
                
                setTimeout(() => {
                    if (dragon.parentNode) {
                        dragon.parentNode.removeChild(dragon);
                    }
                }, 10000);
            }, i * 300);
        }
    }
    
    // Глитч реальности
    function createRealityGlitch() {
        // Создаем глитч эффекты
        const glitch = document.createElement('div');
        glitch.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,0,255,0.1) 2px,
                rgba(255,0,255,0.1) 4px
            );
            animation: realityGlitch 0.1s linear infinite;
            z-index: 1000;
            pointer-events: none;
        `;
        world.appendChild(glitch);
        
        // Случайные глитч блоки
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const glitchBlock = document.createElement('div');
                glitchBlock.style.cssText = `
                    position: absolute;
                    width: ${20 + Math.random() * 100}px;
                    height: ${20 + Math.random() * 100}px;
                    background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00'][Math.floor(Math.random() * 4)]};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: glitchBlock ${0.5 + Math.random() * 1}s ease-out forwards;
                    z-index: 1001;
                `;
                world.appendChild(glitchBlock);
                
                setTimeout(() => {
                    if (glitchBlock.parentNode) {
                        glitchBlock.parentNode.removeChild(glitchBlock);
                    }
                }, 1000);
            }, i * 100);
        }
        
        setTimeout(() => {
            if (glitch.parentNode) {
                glitch.parentNode.removeChild(glitch);
            }
        }, 8000);
    }
    
    // Магическая черная дыра
    function spawnMagicBlackHole() {
        const blackHole = document.createElement('div');
        blackHole.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, 
                #000000 0%, 
                #333333 30%, 
                #666666 60%, 
                #999999 100%);
            border-radius: 50%;
            animation: blackHoleSpin 2s linear infinite;
            z-index: 1500;
            pointer-events: none;
        `;
        world.appendChild(blackHole);
        
        // Создаем эффект всасывания
        for (let i = 0; i < 50; i++) {
            const suckedParticle = document.createElement('div');
            suckedParticle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: blackHoleSuck ${2 + Math.random() * 2}s ease-in forwards;
                z-index: 1000;
            `;
            world.appendChild(suckedParticle);
            
            setTimeout(() => {
                if (suckedParticle.parentNode) {
                    suckedParticle.parentNode.removeChild(suckedParticle);
                }
            }, 4000);
        }
        
        setTimeout(() => {
            if (blackHole.parentNode) {
                blackHole.parentNode.removeChild(blackHole);
            }
        }, 8000);
    }
    
    // Конец вселенной
    function createUniverseEnd() {
        // Создаем эффект конца
        const universeEnd = document.createElement('div');
        universeEnd.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(0,0,0,0.8) 0%, 
                rgba(100,0,0,0.6) 50%, 
                rgba(0,0,0,0.9) 100%);
            animation: universeEnd 5s ease-in forwards;
            z-index: 2000;
            pointer-events: none;
        `;
        world.appendChild(universeEnd);
        
        // Создаем разрушающиеся элементы
        for (let i = 0; i < 30; i++) {
            const fragment = document.createElement('div');
            fragment.style.cssText = `
                position: absolute;
                width: ${10 + Math.random() * 30}px;
                height: ${10 + Math.random() * 30}px;
                background: ${['#ff0000', '#ff6b6b', '#ffa500', '#ffff00'][Math.floor(Math.random() * 4)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: universeFragment ${3 + Math.random() * 2}s ease-out forwards;
                z-index: 1500;
            `;
            world.appendChild(fragment);
            
            setTimeout(() => {
                if (fragment.parentNode) {
                    fragment.parentNode.removeChild(fragment);
                }
            }, 5000);
        }
        
        setTimeout(() => {
            if (universeEnd.parentNode) {
                universeEnd.parentNode.removeChild(universeEnd);
            }
        }, 10000);
    }
    
    // Первобытные силы
    function summonPrimordialForces() {
        const forces = ['🌊', '🔥', '🌪️', '⚡', '🌍', '☀️', '🌙', '⭐'];
        
        for (let i = 0; i < 8; i++) {
            const force = document.createElement('div');
            force.style.cssText = `
                position: absolute;
                font-size: 100px;
                left: ${10 + i * 12}%;
                top: 30%;
                pointer-events: none;
                animation: primordialForce ${6 + i * 0.5}s ease-in-out infinite;
                z-index: 1000;
                text-shadow: 0 0 60px #ffffff;
            `;
            force.textContent = forces[i];
            world.appendChild(force);
            
            setTimeout(() => {
                if (force.parentNode) {
                    force.parentNode.removeChild(force);
                }
            }, 12000);
        }
    }
    
    // Магическая сингулярность
    function createMagicSingularity() {
        const singularity = document.createElement('div');
        singularity.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0px;
            height: 0px;
            background: radial-gradient(circle, 
                #ffffff 0%, 
                #000000 100%);
            border-radius: 50%;
            animation: singularityCollapse 4s ease-in forwards;
            z-index: 2000;
            pointer-events: none;
        `;
        world.appendChild(singularity);
        
        // Создаем искажения пространства-времени
        for (let i = 0; i < 20; i++) {
            const distortion = document.createElement('div');
            distortion.style.cssText = `
                position: absolute;
                width: ${50 + i * 20}px;
                height: ${50 + i * 20}px;
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: spaceTimeDistort ${2 + i * 0.1}s linear infinite;
                z-index: ${1500 - i * 50};
            `;
            world.appendChild(distortion);
            
            setTimeout(() => {
                if (distortion.parentNode) {
                    distortion.parentNode.removeChild(distortion);
                }
            }, 6000);
        }
        
        setTimeout(() => {
            if (singularity.parentNode) {
                singularity.parentNode.removeChild(singularity);
            }
        }, 4000);
    }
    
    // Искажение реальности
    function spawnRealityWarp() {
        // Создаем искажения
        const realityWarp = document.createElement('div');
        realityWarp.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(
                from 0deg at 50% 50%,
                rgba(255,0,255,0.1) 0deg,
                rgba(0,255,255,0.1) 60deg,
                rgba(255,255,0,0.1) 120deg,
                rgba(255,0,0,0.1) 180deg,
                rgba(0,255,0,0.1) 240deg,
                rgba(0,0,255,0.1) 300deg,
                rgba(255,0,255,0.1) 360deg
            );
            animation: realityWarp 3s ease-in-out infinite;
            z-index: 1000;
            pointer-events: none;
        `;
        world.appendChild(realityWarp);
        
        // Создаем плавающие искажения
        for (let i = 0; i < 25; i++) {
            const warp = document.createElement('div');
            warp.style.cssText = `
                position: absolute;
                width: ${30 + Math.random() * 60}px;
                height: ${30 + Math.random() * 60}px;
                background: radial-gradient(circle, 
                    rgba(255,255,255,0.2) 0%, 
                    transparent 100%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: warpFloat ${3 + Math.random() * 3}s ease-in-out infinite;
                z-index: 1001;
            `;
            world.appendChild(warp);
            
            setTimeout(() => {
                if (warp.parentNode) {
                    warp.parentNode.removeChild(warp);
                }
            }, 8000);
        }
        
        setTimeout(() => {
            if (realityWarp.parentNode) {
                realityWarp.parentNode.removeChild(realityWarp);
            }
        }, 10000);
    }
    
    // Ультимативный хаос
    function createUltimateChaos() {
        // Создаем ВСЕ эффекты одновременно!
        const allChaosEffects = [
            createChaosRealm, spawnUniverse, createTimeParadox, summonGods,
            createMultiverse, spawnRealityBreaker, createMagicApocalypse,
            summonEldritchHorrors, createDimensionCollapse, spawnCosmicEntities,
            createMagicBigBang, summonInfiniteDragons, createRealityGlitch,
            spawnMagicBlackHole, createUniverseEnd, summonPrimordialForces,
            createMagicSingularity, spawnRealityWarp
        ];
        
        // Запускаем все эффекты в случайном порядке
        allChaosEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 200);
        });
        
        // Создаем ультимативный хаос портал
        const ultimateChaos = document.createElement('div');
        ultimateChaos.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: conic-gradient(
                #ff0000, #ff8000, #ffff00, #80ff00, 
                #00ff00, #00ff80, #00ffff, #0080ff, 
                #0000ff, #8000ff, #ff00ff, #ff0080, 
                #ff0000, #ff4000, #ff8000, #ffc000,
                #ffff00, #c0ff00, #80ff00, #40ff00,
                #00ff00, #00ff40, #00ff80, #00ffc0,
                #00ffff, #00c0ff, #0080ff, #0040ff,
                #0000ff, #4000ff, #8000ff, #c000ff,
                #ff00ff, #ff00c0, #ff0080, #ff0040,
                #ff0000
            );
            animation: ultimateChaosSpin 1s linear infinite;
            z-index: 3000;
            pointer-events: none;
        `;
        world.appendChild(ultimateChaos);
        
        setTimeout(() => {
            if (ultimateChaos.parentNode) {
                ultimateChaos.parentNode.removeChild(ultimateChaos);
            }
        }, 20000);
    }
    
    // Перегрузка реальности
    function createRealityOverload() {
        // Создаем перегрузку всех эффектов
        const overloadEffects = [
            createChaosRealm, spawnUniverse, createTimeParadox, summonGods,
            createMultiverse, spawnRealityBreaker, createMagicApocalypse,
            summonEldritchHorrors, createDimensionCollapse, spawnCosmicEntities,
            createMagicBigBang, summonInfiniteDragons, createRealityGlitch,
            spawnMagicBlackHole, createUniverseEnd, summonPrimordialForces
        ];
        
        // Запускаем ВСЕ эффекты одновременно с задержкой
        overloadEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 100);
        });
        
        // Создаем перегрузочный экран
        const overload = document.createElement('div');
        overload.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                #ff0000 0px,
                #ff0000 2px,
                #00ff00 2px,
                #00ff00 4px,
                #0000ff 4px,
                #0000ff 6px,
                #ffff00 6px,
                #ffff00 8px
            );
            animation: realityOverload 0.1s linear infinite;
            z-index: 5000;
            pointer-events: none;
        `;
        world.appendChild(overload);
        
        setTimeout(() => {
            if (overload.parentNode) {
                overload.parentNode.removeChild(overload);
            }
        }, 30000);
    }
    
    // Бесконечные вселенные
    function spawnInfiniteUniverses() {
        // Создаем бесконечное количество вселенных
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const universe = document.createElement('div');
                universe.style.cssText = `
                    position: absolute;
                    width: ${20 + Math.random() * 80}px;
                    height: ${20 + Math.random() * 80}px;
                    background: radial-gradient(circle, 
                        rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8) 0%, 
                        rgba(0,0,0,0.9) 100%);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: infiniteUniverse ${3 + Math.random() * 5}s ease-in-out infinite;
                    z-index: ${100 + Math.random() * 400};
                `;
                world.appendChild(universe);
                
                setTimeout(() => {
                    if (universe.parentNode) {
                        universe.parentNode.removeChild(universe);
                    }
                }, 20000);
            }, i * 50);
        }
    }
    
    // Древние боги
    function summonElderGods() {
        const elderGods = ['👑', '⚡', '🔥', '💀', '👁️', '🌙', '☀️', '⭐', '🌟', '💫'];
        
        for (let i = 0; i < 10; i++) {
            const god = document.createElement('div');
            god.style.cssText = `
                position: absolute;
                font-size: ${100 + Math.random() * 50}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: elderGodSummon ${5 + Math.random() * 5}s ease-in-out infinite;
                z-index: 2000;
                text-shadow: 0 0 100px #ffffff;
                filter: hue-rotate(${Math.random() * 360}deg);
            `;
            god.textContent = elderGods[i];
            world.appendChild(god);
            
            setTimeout(() => {
                if (god.parentNode) {
                    god.parentNode.removeChild(god);
                }
            }, 15000);
        }
    }
    
    // Шторм измерений
    function createDimensionStorm() {
        // Создаем шторм из измерений
        for (let i = 0; i < 50; i++) {
            const dimension = document.createElement('div');
            dimension.style.cssText = `
                position: absolute;
                width: ${30 + Math.random() * 70}px;
                height: ${30 + Math.random() * 70}px;
                border: 3px solid rgba(255,255,255,0.5);
                border-radius: ${Math.random() * 50}%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: dimensionStorm ${2 + Math.random() * 3}s ease-in-out infinite;
                z-index: 1000;
                background: radial-gradient(circle, 
                    rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3) 0%, 
                    transparent 100%);
            `;
            world.appendChild(dimension);
            
            setTimeout(() => {
                if (dimension.parentNode) {
                    dimension.parentNode.removeChild(dimension);
                }
            }, 10000);
        }
    }
    
    // Глитч реальности
    function spawnRealityGlitch() {
        // Создаем массивные глитчи
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const glitch = document.createElement('div');
                glitch.style.cssText = `
                    position: absolute;
                    width: ${50 + Math.random() * 200}px;
                    height: ${50 + Math.random() * 200}px;
                    background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: realityGlitchBlock ${0.5 + Math.random() * 1}s ease-out forwards;
                    z-index: 2000;
                    opacity: 0.8;
                `;
                world.appendChild(glitch);
                
                setTimeout(() => {
                    if (glitch.parentNode) {
                        glitch.parentNode.removeChild(glitch);
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
    // Магический Большой хруст
    function createMagicBigCrunch() {
        // Создаем эффект сжатия вселенной
        const crunch = document.createElement('div');
        crunch.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle, 
                rgba(0,0,0,0.8) 0%, 
                rgba(100,0,0,0.6) 50%, 
                rgba(0,0,0,0.9) 100%);
            animation: bigCrunch 6s ease-in forwards;
            z-index: 3000;
            pointer-events: none;
        `;
        world.appendChild(crunch);
        
        // Создаем сжимающиеся элементы
        for (let i = 0; i < 50; i++) {
            const element = document.createElement('div');
            element.style.cssText = `
                position: absolute;
                width: ${100 + Math.random() * 200}px;
                height: ${100 + Math.random() * 200}px;
                background: ${['#ff0000', '#ff6b6b', '#ffa500', '#ffff00'][Math.floor(Math.random() * 4)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: crunchElement ${4 + Math.random() * 2}s ease-in forwards;
                z-index: 2500;
            `;
            world.appendChild(element);
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 6000);
        }
        
        setTimeout(() => {
            if (crunch.parentNode) {
                crunch.parentNode.removeChild(crunch);
            }
        }, 6000);
    }
    
    // Космические ужасы
    function summonCosmicHorrors() {
        const horrors = ['👁️', '🦑', '🐙', '🕷️', '🦂', '🦇', '👹', '👺', '💀', '👻'];
        
        for (let i = 0; i < 25; i++) {
            const horror = document.createElement('div');
            horror.style.cssText = `
                position: absolute;
                font-size: ${80 + Math.random() * 60}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: cosmicHorrorFloat ${4 + Math.random() * 4}s ease-in-out infinite;
                z-index: 1000;
                filter: hue-rotate(${Math.random() * 360}deg) brightness(${0.5 + Math.random() * 1.5});
                text-shadow: 0 0 50px #ff0000;
            `;
            horror.textContent = horrors[Math.floor(Math.random() * horrors.length)];
            world.appendChild(horror);
            
            setTimeout(() => {
                if (horror.parentNode) {
                    horror.parentNode.removeChild(horror);
                }
            }, 12000);
        }
    }
    
    // Коллапс времени
    function createTimeCollapse() {
        // Создаем коллапсирующие временные потоки
        for (let i = 0; i < 20; i++) {
            const timeStream = document.createElement('div');
            timeStream.style.cssText = `
                position: absolute;
                width: 4px;
                height: ${200 + Math.random() * 300}px;
                background: linear-gradient(180deg, 
                    rgba(255,255,0,0.8) 0%, 
                    rgba(255,0,255,0.6) 50%, 
                    rgba(0,255,255,0.8) 100%);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: timeCollapse ${3 + Math.random() * 3}s ease-in forwards;
                z-index: 1500;
                box-shadow: 0 0 20px #ffff00;
            `;
            world.appendChild(timeStream);
            
            setTimeout(() => {
                if (timeStream.parentNode) {
                    timeStream.parentNode.removeChild(timeStream);
                }
            }, 6000);
        }
    }
    
    // Бесконечная магия
    function spawnInfiniteMagic() {
        // Создаем бесконечные магические частицы
        for (let i = 0; i < 1000; i++) {
            setTimeout(() => {
                const magicParticle = document.createElement('div');
                magicParticle.style.cssText = `
                    position: absolute;
                    width: ${1 + Math.random() * 5}px;
                    height: ${1 + Math.random() * 5}px;
                    background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3', '#ffffff'][Math.floor(Math.random() * 6)]};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: infiniteMagicParticle ${2 + Math.random() * 4}s ease-in-out infinite;
                    z-index: 100;
                `;
                world.appendChild(magicParticle);
                
                setTimeout(() => {
                    if (magicParticle.parentNode) {
                        magicParticle.parentNode.removeChild(magicParticle);
                    }
                }, 10000);
            }, i * 10);
        }
    }
    
    // Разлом реальности
    function createRealityFracture() {
        // Создаем массивные разломы
        for (let i = 0; i < 30; i++) {
            const fracture = document.createElement('div');
            fracture.style.cssText = `
                position: absolute;
                width: ${200 + Math.random() * 400}px;
                height: 6px;
                background: linear-gradient(90deg, 
                    transparent 0%, 
                    #ff0000 20%, 
                    #ffff00 50%, 
                    #ff0000 80%, 
                    transparent 100%);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: realityFracture ${2 + Math.random() * 3}s ease-out;
                z-index: 2000;
                transform: rotate(${Math.random() * 360}deg);
                box-shadow: 0 0 30px #ff0000;
            `;
            world.appendChild(fracture);
            
            setTimeout(() => {
                if (fracture.parentNode) {
                    fracture.parentNode.removeChild(fracture);
                }
            }, 5000);
        }
    }
    
    // Первобытный хаос
    function summonPrimordialChaos() {
        // Создаем первобытный хаос
        const chaos = document.createElement('div');
        chaos.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: conic-gradient(
                from 0deg at 50% 50%,
                #ff0000 0deg,
                #ff8000 45deg,
                #ffff00 90deg,
                #80ff00 135deg,
                #00ff00 180deg,
                #00ff80 225deg,
                #00ffff 270deg,
                #0080ff 315deg,
                #ff0000 360deg
            );
            animation: primordialChaos 2s linear infinite;
            z-index: 1000;
            pointer-events: none;
            opacity: 0.3;
        `;
        world.appendChild(chaos);
        
        // Создаем хаотические элементы
        for (let i = 0; i < 100; i++) {
            const element = document.createElement('div');
            element.style.cssText = `
                position: absolute;
                width: ${10 + Math.random() * 30}px;
                height: ${10 + Math.random() * 30}px;
                background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]};
                border-radius: ${Math.random() * 50}%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: chaosElement ${1 + Math.random() * 3}s ease-in-out infinite;
                z-index: 1001;
            `;
            world.appendChild(element);
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 8000);
        }
        
        setTimeout(() => {
            if (chaos.parentNode) {
                chaos.parentNode.removeChild(chaos);
            }
        }, 10000);
    }
    
    // Магическая пустота
    function createMagicVoid() {
        // Создаем магическую пустоту
        const magicVoid = document.createElement('div');
        magicVoid.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0px;
            height: 0px;
            background: radial-gradient(circle, 
                transparent 0%, 
                rgba(0,0,0,0.5) 30%, 
                rgba(0,0,0,0.8) 70%, 
                #000000 100%);
            border-radius: 50%;
            animation: magicVoidExpand 8s ease-out forwards;
            z-index: 3000;
            pointer-events: none;
        `;
        world.appendChild(magicVoid);
        
        // Создаем всасываемые элементы
        for (let i = 0; i < 200; i++) {
            const suckedElement = document.createElement('div');
            suckedElement.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 8}px;
                height: ${2 + Math.random() * 8}px;
                background: ${['#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'][Math.floor(Math.random() * 5)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: voidSuck ${3 + Math.random() * 3}s ease-in forwards;
                z-index: 2000;
            `;
            world.appendChild(suckedElement);
            
            setTimeout(() => {
                if (suckedElement.parentNode) {
                    suckedElement.parentNode.removeChild(suckedElement);
                }
            }, 6000);
        }
        
        setTimeout(() => {
            if (magicVoid.parentNode) {
                magicVoid.parentNode.removeChild(magicVoid);
            }
        }, 8000);
    }
    
    // Реальность вселенной
    function spawnUniverseReality() {
        // Создаем реальность вселенной
        for (let i = 0; i < 50; i++) {
            const reality = document.createElement('div');
            reality.style.cssText = `
                position: absolute;
                width: ${100 + Math.random() * 200}px;
                height: ${100 + Math.random() * 200}px;
                background: radial-gradient(circle, 
                    rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4) 0%, 
                    rgba(0,0,0,0.8) 100%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: universeReality ${4 + Math.random() * 4}s ease-in-out infinite;
                z-index: 500;
            `;
            world.appendChild(reality);
            
            setTimeout(() => {
                if (reality.parentNode) {
                    reality.parentNode.removeChild(reality);
                }
            }, 15000);
        }
    }
    
    // Магическая бесконечность
    function createMagicInfinity() {
        // Создаем символ бесконечности
        const infinity = document.createElement('div');
        infinity.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 150px;
            border: 10px solid transparent;
            border-top: 10px solid #ff6b6b;
            border-bottom: 10px solid #4ecdc4;
            border-radius: 50%;
            animation: magicInfinity 3s linear infinite;
            z-index: 2000;
            pointer-events: none;
        `;
        world.appendChild(infinity);
        
        // Создаем бесконечные частицы
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'][Math.floor(Math.random() * 4)]};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                animation: infinityParticle ${2 + Math.random() * 2}s linear infinite;
                z-index: 1500;
            `;
            world.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 10000);
        }
        
        setTimeout(() => {
            if (infinity.parentNode) {
                infinity.parentNode.removeChild(infinity);
            }
        }, 10000);
    }
    
    // Абсолютный хаос
    function summonAbsoluteChaos() {
        // Создаем абсолютный хаос - ВСЕ эффекты одновременно!
        const allEffects = [
            createChaosRealm, spawnUniverse, createTimeParadox, summonGods,
            createMultiverse, spawnRealityBreaker, createMagicApocalypse,
            summonEldritchHorrors, createDimensionCollapse, spawnCosmicEntities,
            createMagicBigBang, summonInfiniteDragons, createRealityGlitch,
            spawnMagicBlackHole, createUniverseEnd, summonPrimordialForces,
            createMagicSingularity, spawnRealityWarp, createRealityOverload,
            spawnInfiniteUniverses, summonElderGods, createDimensionStorm,
            spawnRealityGlitch, createMagicBigCrunch, summonCosmicHorrors,
            createTimeCollapse, spawnInfiniteMagic, createRealityFracture,
            summonPrimordialChaos, createMagicVoid, spawnUniverseReality,
            createMagicInfinity
        ];
        
        // Запускаем ВСЕ эффекты одновременно!
        allEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 50);
        });
        
        // Создаем абсолютный хаос портал
        const absoluteChaos = document.createElement('div');
        absoluteChaos.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: conic-gradient(
                #ff0000, #ff4000, #ff8000, #ffc000, #ffff00, #c0ff00, #80ff00, #40ff00,
                #00ff00, #00ff40, #00ff80, #00ffc0, #00ffff, #00c0ff, #0080ff, #0040ff,
                #0000ff, #4000ff, #8000ff, #c000ff, #ff00ff, #ff00c0, #ff0080, #ff0040,
                #ff0000, #ff2000, #ff6000, #ffa000, #ffe000, #e0ff00, #a0ff00, #60ff00,
                #20ff00, #00ff20, #00ff60, #00ffa0, #00ffe0, #00e0ff, #00a0ff, #0060ff,
                #0020ff, #2000ff, #6000ff, #a000ff, #e000ff, #ff00e0, #ff00a0, #ff0060,
                #ff0020, #ff1000, #ff5000, #ff9000, #ffd000, #d0ff00, #90ff00, #50ff00,
                #10ff00, #00ff10, #00ff50, #00ff90, #00ffd0, #00d0ff, #0090ff, #0050ff,
                #0010ff, #1000ff, #5000ff, #9000ff, #d000ff, #ff00d0, #ff0090, #ff0050,
                #ff0010, #ff0800, #ff4800, #ff8800, #ffc800, #c8ff00, #88ff00, #48ff00,
                #08ff00, #00ff08, #00ff48, #00ff88, #00ffc8, #00c8ff, #0088ff, #0048ff,
                #0008ff, #0800ff, #4800ff, #8800ff, #c800ff, #ff00c8, #ff0088, #ff0048,
                #ff0008, #ff0000
            );
            animation: absoluteChaosSpin 0.5s linear infinite;
            z-index: 5000;
            pointer-events: none;
        `;
        world.appendChild(absoluteChaos);
        
        setTimeout(() => {
            if (absoluteChaos.parentNode) {
                absoluteChaos.parentNode.removeChild(absoluteChaos);
            }
        }, 30000);
    }
    
    // Конец реальности
    function createRealityEnd() {
        // Создаем конец реальности
        const realityEnd = document.createElement('div');
        realityEnd.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(0,0,0,0.9) 0%, 
                rgba(50,0,0,0.8) 50%, 
                rgba(0,0,0,1) 100%);
            animation: realityEnd 8s ease-in forwards;
            z-index: 4000;
            pointer-events: none;
        `;
        world.appendChild(realityEnd);
        
        // Создаем разрушающиеся элементы реальности
        for (let i = 0; i < 100; i++) {
            const fragment = document.createElement('div');
            fragment.style.cssText = `
                position: absolute;
                width: ${5 + Math.random() * 20}px;
                height: ${5 + Math.random() * 20}px;
                background: ${['#ff0000', '#ff6b6b', '#ffa500', '#ffff00', '#ffffff'][Math.floor(Math.random() * 5)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: realityFragment ${4 + Math.random() * 4}s ease-out forwards;
                z-index: 3000;
            `;
            world.appendChild(fragment);
            
            setTimeout(() => {
                if (fragment.parentNode) {
                    fragment.parentNode.removeChild(fragment);
                }
            }, 8000);
        }
        
        setTimeout(() => {
            if (realityEnd.parentNode) {
                realityEnd.parentNode.removeChild(realityEnd);
            }
        }, 12000);
    }
    
    // Магическое все
    function spawnMagicEverything() {
        // Создаем ВСЕ возможные эффекты одновременно!
        const everythingEffects = [
            createChaosRealm, spawnUniverse, createTimeParadox, summonGods,
            createMultiverse, spawnRealityBreaker, createMagicApocalypse,
            summonEldritchHorrors, createDimensionCollapse, spawnCosmicEntities,
            createMagicBigBang, summonInfiniteDragons, createRealityGlitch,
            spawnMagicBlackHole, createUniverseEnd, summonPrimordialForces,
            createMagicSingularity, spawnRealityWarp, createRealityOverload,
            spawnInfiniteUniverses, summonElderGods, createDimensionStorm,
            spawnRealityGlitch, createMagicBigCrunch, summonCosmicHorrors,
            createTimeCollapse, spawnInfiniteMagic, createRealityFracture,
            summonPrimordialChaos, createMagicVoid, spawnUniverseReality,
            createMagicInfinity, summonAbsoluteChaos, createRealityEnd
        ];
        
        // Запускаем ВСЕ эффекты одновременно!
        everythingEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 25);
        });
        
        // Создаем магическое все
        const magicEverything = document.createElement('div');
        magicEverything.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(
                from 0deg at 50% 50%,
                #ff0000 0deg, #ff8000 30deg, #ffff00 60deg, #80ff00 90deg,
                #00ff00 120deg, #00ff80 150deg, #00ffff 180deg, #0080ff 210deg,
                #0000ff 240deg, #8000ff 270deg, #ff00ff 300deg, #ff0080 330deg,
                #ff0000 360deg
            );
            animation: magicEverything 1s linear infinite;
            z-index: 6000;
            pointer-events: none;
            opacity: 0.2;
        `;
        world.appendChild(magicEverything);
        
        setTimeout(() => {
            if (magicEverything.parentNode) {
                magicEverything.parentNode.removeChild(magicEverything);
            }
        }, 40000);
    }
    
    // Ультимативная реальность
    function createUltimateReality() {
        // Создаем ультимативную реальность - ВСЕ ВОЗМОЖНОЕ!
        const ultimateEffects = [
            createChaosRealm, spawnUniverse, createTimeParadox, summonGods,
            createMultiverse, spawnRealityBreaker, createMagicApocalypse,
            summonEldritchHorrors, createDimensionCollapse, spawnCosmicEntities,
            createMagicBigBang, summonInfiniteDragons, createRealityGlitch,
            spawnMagicBlackHole, createUniverseEnd, summonPrimordialForces,
            createMagicSingularity, spawnRealityWarp, createRealityOverload,
            spawnInfiniteUniverses, summonElderGods, createDimensionStorm,
            spawnRealityGlitch, createMagicBigCrunch, summonCosmicHorrors,
            createTimeCollapse, spawnInfiniteMagic, createRealityFracture,
            summonPrimordialChaos, createMagicVoid, spawnUniverseReality,
            createMagicInfinity, summonAbsoluteChaos, createRealityEnd,
            spawnMagicEverything
        ];
        
        // Запускаем ВСЕ эффекты одновременно!
        ultimateEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 10);
        });
        
        // Создаем ультимативную реальность
        const ultimateReality = document.createElement('div');
        ultimateReality.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            border-radius: 50%;
            background: conic-gradient(
                #ff0000, #ff2000, #ff4000, #ff6000, #ff8000, #ffa000, #ffc000, #ffe000,
                #ffff00, #e0ff00, #c0ff00, #a0ff00, #80ff00, #60ff00, #40ff00, #20ff00,
                #00ff00, #00ff20, #00ff40, #00ff60, #00ff80, #00ffa0, #00ffc0, #00ffe0,
                #00ffff, #00e0ff, #00c0ff, #00a0ff, #0080ff, #0060ff, #0040ff, #0020ff,
                #0000ff, #2000ff, #4000ff, #6000ff, #8000ff, #a000ff, #c000ff, #e000ff,
                #ff00ff, #ff00e0, #ff00c0, #ff00a0, #ff0080, #ff0060, #ff0040, #ff0020,
                #ff0000, #ff1000, #ff3000, #ff5000, #ff7000, #ff9000, #ffb000, #ffd000,
                #ffff00, #d0ff00, #b0ff00, #90ff00, #70ff00, #50ff00, #30ff00, #10ff00,
                #00ff00, #00ff10, #00ff30, #00ff50, #00ff70, #00ff90, #00ffb0, #00ffd0,
                #00ffff, #00d0ff, #00b0ff, #0090ff, #0070ff, #0050ff, #0030ff, #0010ff,
                #0000ff, #1000ff, #3000ff, #5000ff, #7000ff, #9000ff, #b000ff, #d000ff,
                #ff00ff, #ff00d0, #ff00b0, #ff0090, #ff0070, #ff0050, #ff0030, #ff0010,
                #ff0000
            );
            animation: ultimateRealitySpin 0.2s linear infinite;
            z-index: 7000;
            pointer-events: none;
        `;
        world.appendChild(ultimateReality);
        
        setTimeout(() => {
            if (ultimateReality.parentNode) {
                ultimateReality.parentNode.removeChild(ultimateReality);
            }
        }, 50000);
    }
    
    // Всемогущая магия
    function createOmnipotentMagic() {
        // Создаем ВСЕ возможные эффекты одновременно!
        const omnipotentEffects = [
            createChaosRealm, spawnUniverse, createTimeParadox, summonGods,
            createMultiverse, spawnRealityBreaker, createMagicApocalypse,
            summonEldritchHorrors, createDimensionCollapse, spawnCosmicEntities,
            createMagicBigBang, summonInfiniteDragons, createRealityGlitch,
            spawnMagicBlackHole, createUniverseEnd, summonPrimordialForces,
            createMagicSingularity, spawnRealityWarp, createRealityOverload,
            spawnInfiniteUniverses, summonElderGods, createDimensionStorm,
            spawnRealityGlitch, createMagicBigCrunch, summonCosmicHorrors,
            createTimeCollapse, spawnInfiniteMagic, createRealityFracture,
            summonPrimordialChaos, createMagicVoid, spawnUniverseReality,
            createMagicInfinity, summonAbsoluteChaos, createRealityEnd,
            spawnMagicEverything, createUltimateReality
        ];
        
        // Запускаем ВСЕ эффекты одновременно!
        omnipotentEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 5);
        });
        
        // Создаем всемогущую магию
        const omnipotentMagic = document.createElement('div');
        omnipotentMagic.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(
                from 0deg at 50% 50%,
                #ff0000 0deg, #ff4000 15deg, #ff8000 30deg, #ffc000 45deg,
                #ffff00 60deg, #c0ff00 75deg, #80ff00 90deg, #40ff00 105deg,
                #00ff00 120deg, #00ff40 135deg, #00ff80 150deg, #00ffc0 165deg,
                #00ffff 180deg, #00c0ff 195deg, #0080ff 210deg, #0040ff 225deg,
                #0000ff 240deg, #4000ff 255deg, #8000ff 270deg, #c000ff 285deg,
                #ff00ff 300deg, #ff00c0 315deg, #ff0080 330deg, #ff0040 345deg,
                #ff0000 360deg
            );
            animation: omnipotentMagic 0.1s linear infinite;
            z-index: 8000;
            pointer-events: none;
            opacity: 0.1;
        `;
        world.appendChild(omnipotentMagic);
        
        setTimeout(() => {
            if (omnipotentMagic.parentNode) {
                omnipotentMagic.parentNode.removeChild(omnipotentMagic);
            }
        }, 60000);
    }
    
    // Уничтожение реальности
    function spawnRealityDestruction() {
        // Создаем уничтожение реальности
        const destruction = document.createElement('div');
        destruction.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(255,0,0,0.9) 0%, 
                rgba(100,0,0,0.8) 50%, 
                rgba(0,0,0,1) 100%);
            animation: realityDestruction 10s ease-in forwards;
            z-index: 5000;
            pointer-events: none;
        `;
        world.appendChild(destruction);
        
        // Создаем разрушающиеся элементы
        for (let i = 0; i < 200; i++) {
            const fragment = document.createElement('div');
            fragment.style.cssText = `
                position: absolute;
                width: ${5 + Math.random() * 25}px;
                height: ${5 + Math.random() * 25}px;
                background: ${['#ff0000', '#ff6b6b', '#ffa500', '#ffff00', '#ffffff', '#000000'][Math.floor(Math.random() * 6)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: realityDestructionFragment ${5 + Math.random() * 5}s ease-out forwards;
                z-index: 4000;
            `;
            world.appendChild(fragment);
            
            setTimeout(() => {
                if (fragment.parentNode) {
                    fragment.parentNode.removeChild(fragment);
                }
            }, 10000);
        }
        
        setTimeout(() => {
            if (destruction.parentNode) {
                destruction.parentNode.removeChild(destruction);
            }
        }, 15000);
    }
    
    // Бесконечный хаос
    function createInfiniteChaos() {
        // Создаем бесконечный хаос
        const infiniteChaos = document.createElement('div');
        infiniteChaos.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-radial-gradient(
                circle at center,
                #ff0000 0px, #ff0000 10px,
                #00ff00 10px, #00ff00 20px,
                #0000ff 20px, #0000ff 30px,
                #ffff00 30px, #ffff00 40px,
                #ff00ff 40px, #ff00ff 50px,
                #00ffff 50px, #00ffff 60px
            );
            animation: infiniteChaos 0.5s linear infinite;
            z-index: 3000;
            pointer-events: none;
            opacity: 0.2;
        `;
        world.appendChild(infiniteChaos);
        
        // Создаем бесконечные хаотические элементы
        for (let i = 0; i < 500; i++) {
            setTimeout(() => {
                const chaosElement = document.createElement('div');
                chaosElement.style.cssText = `
                    position: absolute;
                    width: ${2 + Math.random() * 10}px;
                    height: ${2 + Math.random() * 10}px;
                    background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'][Math.floor(Math.random() * 7)]};
                    border-radius: ${Math.random() * 50}%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: infiniteChaosElement ${1 + Math.random() * 3}s ease-in-out infinite;
                    z-index: 2000;
                `;
                world.appendChild(chaosElement);
                
                setTimeout(() => {
                    if (chaosElement.parentNode) {
                        chaosElement.parentNode.removeChild(chaosElement);
                    }
                }, 15000);
            }, i * 20);
        }
        
        setTimeout(() => {
            if (infiniteChaos.parentNode) {
                infiniteChaos.parentNode.removeChild(infiniteChaos);
            }
        }, 20000);
    }
    
    // Разлом измерений
    function createDimensionBreak() {
        // Создаем разлом измерений
        for (let i = 0; i < 50; i++) {
            const dimensionBreak = document.createElement('div');
            dimensionBreak.style.cssText = `
                position: absolute;
                width: ${100 + Math.random() * 300}px;
                height: 8px;
                background: linear-gradient(90deg, 
                    transparent 0%, 
                    #ff0000 20%, 
                    #ffff00 40%, 
                    #00ff00 60%, 
                    #00ffff 80%, 
                    transparent 100%);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: dimensionBreak ${3 + Math.random() * 3}s ease-out;
                z-index: 2500;
                transform: rotate(${Math.random() * 360}deg);
                box-shadow: 0 0 40px #ffffff;
            `;
            world.appendChild(dimensionBreak);
            
            setTimeout(() => {
                if (dimensionBreak.parentNode) {
                    dimensionBreak.parentNode.removeChild(dimensionBreak);
                }
            }, 6000);
        }
    }
    
    // Перегрузка магии
    function spawnMagicOverload() {
        // Создаем перегрузку магии
        const overload = document.createElement('div');
        overload.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                #ff0000 0px, #ff0000 1px,
                #00ff00 1px, #00ff00 2px,
                #0000ff 2px, #0000ff 3px,
                #ffff00 3px, #ffff00 4px,
                #ff00ff 4px, #ff00ff 5px,
                #00ffff 5px, #00ffff 6px
            );
            animation: magicOverload 0.05s linear infinite;
            z-index: 6000;
            pointer-events: none;
            opacity: 0.3;
        `;
        world.appendChild(overload);
        
        // Создаем перегруженные магические элементы
        for (let i = 0; i < 300; i++) {
            setTimeout(() => {
                const magicElement = document.createElement('div');
                magicElement.style.cssText = `
                    position: absolute;
                    width: ${3 + Math.random() * 12}px;
                    height: ${3 + Math.random() * 12}px;
                    background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3', '#ffffff'][Math.floor(Math.random() * 6)]};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: magicOverloadElement ${0.5 + Math.random() * 1}s ease-in-out infinite;
                    z-index: 3000;
                `;
                world.appendChild(magicElement);
                
                setTimeout(() => {
                    if (magicElement.parentNode) {
                        magicElement.parentNode.removeChild(magicElement);
                    }
                }, 10000);
            }, i * 15);
        }
        
        setTimeout(() => {
            if (overload.parentNode) {
                overload.parentNode.removeChild(overload);
            }
        }, 15000);
    }
    
    // Глитч реальности
    function createRealityGlitch() {
        // Создаем глитч реальности
        const glitch = document.createElement('div');
        glitch.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                45deg,
                transparent 0px, transparent 2px,
                rgba(255,0,255,0.1) 2px, rgba(255,0,255,0.1) 4px,
                transparent 4px, transparent 6px,
                rgba(0,255,255,0.1) 6px, rgba(0,255,255,0.1) 8px
            );
            animation: realityGlitch 0.1s linear infinite;
            z-index: 4000;
            pointer-events: none;
        `;
        world.appendChild(glitch);
        
        // Создаем глитч блоки
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const glitchBlock = document.createElement('div');
                glitchBlock.style.cssText = `
                    position: absolute;
                    width: ${30 + Math.random() * 150}px;
                    height: ${30 + Math.random() * 150}px;
                    background: ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][Math.floor(Math.random() * 6)]};
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    animation: realityGlitchBlock ${0.3 + Math.random() * 0.7}s ease-out forwards;
                    z-index: 3500;
                    opacity: 0.9;
                `;
                world.appendChild(glitchBlock);
                
                setTimeout(() => {
                    if (glitchBlock.parentNode) {
                        glitchBlock.parentNode.removeChild(glitchBlock);
                    }
                }, 1000);
            }, i * 30);
        }
        
        setTimeout(() => {
            if (glitch.parentNode) {
                glitch.parentNode.removeChild(glitch);
            }
        }, 12000);
    }
    
    // Космические сущности
    function summonCosmicEntities() {
        const entities = ['🌌', '⭐', '🌟', '💫', '🌠', '☄️', '🛸', '👽', '🌍', '🌙'];
        
        for (let i = 0; i < 30; i++) {
            const entity = document.createElement('div');
            entity.style.cssText = `
                position: absolute;
                font-size: ${50 + Math.random() * 80}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: cosmicEntitySummon ${6 + Math.random() * 6}s ease-in-out infinite;
                z-index: 1500;
                text-shadow: 0 0 60px #ffffff;
                filter: hue-rotate(${Math.random() * 360}deg);
            `;
            entity.textContent = entities[Math.floor(Math.random() * entities.length)];
            world.appendChild(entity);
            
            setTimeout(() => {
                if (entity.parentNode) {
                    entity.parentNode.removeChild(entity);
                }
            }, 18000);
        }
    }
    
    // Магическая сингулярность
    function createMagicSingularity() {
        const singularity = document.createElement('div');
        singularity.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0px;
            height: 0px;
            background: radial-gradient(circle, 
                #ffffff 0%, 
                #ff6b6b 20%, 
                #4ecdc4 40%, 
                #45b7d1 60%, 
                #f9ca24 80%, 
                #000000 100%);
            border-radius: 50%;
            animation: magicSingularityCollapse 6s ease-in forwards;
            z-index: 4000;
            pointer-events: none;
        `;
        world.appendChild(singularity);
        
        // Создаем искажения пространства-времени
        for (let i = 0; i < 30; i++) {
            const distortion = document.createElement('div');
            distortion.style.cssText = `
                position: absolute;
                width: ${60 + i * 30}px;
                height: ${60 + i * 30}px;
                border: 3px solid rgba(255,255,255,0.4);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: spaceTimeDistortion ${3 + i * 0.2}s linear infinite;
                z-index: ${3500 - i * 100};
            `;
            world.appendChild(distortion);
            
            setTimeout(() => {
                if (distortion.parentNode) {
                    distortion.parentNode.removeChild(distortion);
                }
            }, 8000);
        }
        
        setTimeout(() => {
            if (singularity.parentNode) {
                singularity.parentNode.removeChild(singularity);
            }
        }, 6000);
    }
    
    // Коллапс вселенной
    function spawnUniverseCollapse() {
        // Создаем коллапс вселенной
        const collapse = document.createElement('div');
        collapse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle, 
                rgba(0,0,0,0.9) 0%, 
                rgba(50,0,0,0.8) 50%, 
                rgba(0,0,0,1) 100%);
            animation: universeCollapse 8s ease-in forwards;
            z-index: 4500;
            pointer-events: none;
        `;
        world.appendChild(collapse);
        
        // Создаем коллапсирующие элементы
        for (let i = 0; i = 100; i++) {
            const element = document.createElement('div');
            element.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 80}px;
                height: ${20 + Math.random() * 80}px;
                background: ${['#ff0000', '#ff6b6b', '#ffa500', '#ffff00', '#ffffff'][Math.floor(Math.random() * 5)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: universeCollapseElement ${5 + Math.random() * 3}s ease-in forwards;
                z-index: 4000;
            `;
            world.appendChild(element);
            
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, 8000);
        }
        
        setTimeout(() => {
            if (collapse.parentNode) {
                collapse.parentNode.removeChild(collapse);
            }
        }, 8000);
    }
    
    // Временной парадокс
    function createTimeParadox() {
        // Создаем временные парадоксы
        for (let i = 0; i < 15; i++) {
            const paradox = document.createElement('div');
            paradox.style.cssText = `
                position: absolute;
                width: ${80 + i * 40}px;
                height: ${80 + i * 40}px;
                border: 4px solid rgba(255,255,0,0.9);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: timeParadoxLoop ${2 + i * 0.3}s linear infinite;
                z-index: 2000;
            `;
            world.appendChild(paradox);
            
            setTimeout(() => {
                if (paradox.parentNode) {
                    paradox.parentNode.removeChild(paradox);
                }
            }, 10000);
        }
        
        // Создаем временные искажения
        const timeDistortions = document.createElement('div');
        timeDistortions.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: conic-gradient(
                rgba(255,0,255,0.2) 0deg,
                rgba(0,255,255,0.2) 72deg,
                rgba(255,255,0,0.2) 144deg,
                rgba(255,0,0,0.2) 216deg,
                rgba(0,255,0,0.2) 288deg,
                rgba(0,0,255,0.2) 360deg
            );
            animation: timeParadoxDistort 5s ease-in-out infinite;
            z-index: 1500;
            pointer-events: none;
        `;
        world.appendChild(timeDistortions);
        
        setTimeout(() => {
            if (timeDistortions.parentNode) {
                timeDistortions.parentNode.removeChild(timeDistortions);
            }
        }, 12000);
    }
    
    // Первобытные силы
    function summonPrimordialForces() {
        const forces = ['🌊', '🔥', '🌪️', '⚡', '🌍', '☀️', '🌙', '⭐', '🌟', '💫'];
        
        for (let i = 0; i < 10; i++) {
            const force = document.createElement('div');
            force.style.cssText = `
                position: absolute;
                font-size: ${120 + Math.random() * 80}px;
                left: ${5 + i * 10}%;
                top: 25%;
                pointer-events: none;
                animation: primordialForceSummon ${8 + i * 0.8}s ease-in-out infinite;
                z-index: 2000;
                text-shadow: 0 0 80px #ffffff;
                filter: hue-rotate(${Math.random() * 360}deg);
            `;
            force.textContent = forces[i];
            world.appendChild(force);
            
            setTimeout(() => {
                if (force.parentNode) {
                    force.parentNode.removeChild(force);
                }
            }, 15000);
        }
    }
    
    // Магический Большой взрыв
    function createMagicBigBang() {
        // Создаем Большой взрыв
        const bigBang = document.createElement('div');
        bigBang.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0px;
            height: 0px;
            background: radial-gradient(circle, 
                #ffffff 0%, 
                #ffff00 15%, 
                #ff6b6b 30%, 
                #4ecdc4 45%, 
                #45b7d1 60%, 
                #f9ca24 75%, 
                #ff9ff3 90%, 
                #000000 100%);
            border-radius: 50%;
            animation: magicBigBang 7s ease-out forwards;
            z-index: 3000;
            pointer-events: none;
        `;
        world.appendChild(bigBang);
        
        // Создаем частицы взрыва
        for (let i = 0; i < 150; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 5px;
                height: 5px;
                background: ${['#ffffff', '#ffff00', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'][Math.floor(Math.random() * 7)]};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                animation: bigBangParticleExplosion ${4 + Math.random() * 3}s ease-out forwards;
                z-index: 2500;
            `;
            world.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 7000);
        }
        
        setTimeout(() => {
            if (bigBang.parentNode) {
                bigBang.parentNode.removeChild(bigBang);
            }
        }, 7000);
    }
    
    // Искажение реальности
    function spawnRealityWarp() {
        // Создаем искажения реальности
        const realityWarp = document.createElement('div');
        realityWarp.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(
                from 0deg at 50% 50%,
                rgba(255,0,255,0.2) 0deg,
                rgba(0,255,255,0.2) 45deg,
                rgba(255,255,0,0.2) 90deg,
                rgba(255,0,0,0.2) 135deg,
                rgba(0,255,0,0.2) 180deg,
                rgba(0,0,255,0.2) 225deg,
                rgba(255,0,255,0.2) 270deg,
                rgba(0,255,255,0.2) 315deg,
                rgba(255,0,255,0.2) 360deg
            );
            animation: realityWarpDistort 4s ease-in-out infinite;
            z-index: 2000;
            pointer-events: none;
        `;
        world.appendChild(realityWarp);
        
        // Создаем плавающие искажения
        for (let i = 0; i < 40; i++) {
            const warp = document.createElement('div');
            warp.style.cssText = `
                position: absolute;
                width: ${40 + Math.random() * 80}px;
                height: ${40 + Math.random() * 80}px;
                background: radial-gradient(circle, 
                    rgba(255,255,255,0.3) 0%, 
                    transparent 100%);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: realityWarpFloat ${4 + Math.random() * 4}s ease-in-out infinite;
                z-index: 1500;
            `;
            world.appendChild(warp);
            
            setTimeout(() => {
                if (warp.parentNode) {
                    warp.parentNode.removeChild(warp);
                }
            }, 12000);
        }
        
        setTimeout(() => {
            if (realityWarp.parentNode) {
                realityWarp.parentNode.removeChild(realityWarp);
            }
        }, 12000);
    }
    
    // Магическая пустота
    function createMagicVoid() {
        // Создаем магическую пустоту
        const magicVoid = document.createElement('div');
        magicVoid.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0px;
            height: 0px;
            background: radial-gradient(circle, 
                transparent 0%, 
                rgba(0,0,0,0.6) 40%, 
                rgba(0,0,0,0.9) 80%, 
                #000000 100%);
            border-radius: 50%;
            animation: magicVoidExpansion 10s ease-out forwards;
            z-index: 4000;
            pointer-events: none;
        `;
        world.appendChild(magicVoid);
        
        // Создаем всасываемые элементы
        for (let i = 0; i < 300; i++) {
            const suckedElement = document.createElement('div');
            suckedElement.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 12}px;
                height: ${3 + Math.random() * 12}px;
                background: ${['#ffffff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#ff9ff3'][Math.floor(Math.random() * 6)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: voidElementSuck ${4 + Math.random() * 4}s ease-in forwards;
                z-index: 3000;
            `;
            world.appendChild(suckedElement);
            
            setTimeout(() => {
                if (suckedElement.parentNode) {
                    suckedElement.parentNode.removeChild(suckedElement);
                }
            }, 8000);
        }
        
        setTimeout(() => {
            if (magicVoid.parentNode) {
                magicVoid.parentNode.removeChild(magicVoid);
            }
        }, 10000);
    }
    
    // Древние ужасы
    function summonEldritchHorrors() {
        const horrors = ['👁️', '🦑', '🐙', '🕷️', '🦂', '🦇', '👹', '👺', '💀', '👻'];
        
        for (let i = 0; i < 20; i++) {
            const horror = document.createElement('div');
            horror.style.cssText = `
                position: absolute;
                font-size: ${100 + Math.random() * 100}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: eldritchHorrorFloat ${6 + Math.random() * 6}s ease-in-out infinite;
                z-index: 1500;
                filter: hue-rotate(${Math.random() * 360}deg) brightness(${0.3 + Math.random() * 1.7});
                text-shadow: 0 0 60px #ff0000;
            `;
            horror.textContent = horrors[Math.floor(Math.random() * horrors.length)];
            world.appendChild(horror);
            
            setTimeout(() => {
                if (horror.parentNode) {
                    horror.parentNode.removeChild(horror);
                }
            }, 15000);
        }
    }
    
    // Шторм измерений
    function createDimensionStorm() {
        // Создаем шторм из измерений
        for (let i = 0; i < 80; i++) {
            const dimension = document.createElement('div');
            dimension.style.cssText = `
                position: absolute;
                width: ${40 + Math.random() * 100}px;
                height: ${40 + Math.random() * 100}px;
                border: 4px solid rgba(255,255,255,0.6);
                border-radius: ${Math.random() * 50}%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: dimensionStormFloat ${3 + Math.random() * 4}s ease-in-out infinite;
                z-index: 1500;
                background: radial-gradient(circle, 
                    rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4) 0%, 
                    transparent 100%);
            `;
            world.appendChild(dimension);
            
            setTimeout(() => {
                if (dimension.parentNode) {
                    dimension.parentNode.removeChild(dimension);
                }
            }, 12000);
        }
    }
    
    // Магический апокалипсис
    function spawnMagicApocalypse() {
        // Создаем магический апокалипсис
        const apocalypse = document.createElement('div');
        apocalypse.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, 
                rgba(255,0,0,0.4) 0%, 
                rgba(255,100,0,0.3) 50%, 
                rgba(0,0,0,0.6) 100%);
            animation: magicApocalypseGlow 4s ease-in-out infinite;
            z-index: 2000;
            pointer-events: none;
        `;
        world.appendChild(apocalypse);
        
        // Создаем апокалиптические эффекты
        const apocalypseEffects = [
            () => createMeteorShower(),
            () => createLightning(),
            () => createTornado(),
            () => createFireworks(),
            () => spawnMagicCrystals()
        ];
        
        // Запускаем все эффекты одновременно
        apocalypseEffects.forEach((effect, index) => {
            setTimeout(() => effect(), index * 800);
        });
        
        setTimeout(() => {
            if (apocalypse.parentNode) {
                apocalypse.parentNode.removeChild(apocalypse);
            }
        }, 20000);
    }
    
    // Ультимативный хаос
    function createUltimateChaos() {
        // Создаем ультимативный хаос - ВСЕ эффекты одновременно!
        const allEffects = [
            createChaosRealm, spawnUniverse, createTimeParadox, summonGods,
            createMultiverse, spawnRealityBreaker, createMagicApocalypse,
            summonEldritchHorrors, createDimensionCollapse, spawnCosmicEntities,
            createMagicBigBang, summonInfiniteDragons, createRealityGlitch,
            spawnMagicBlackHole, createUniverseEnd, summonPrimordialForces,
            createMagicSingularity, spawnRealityWarp, createRealityOverload,
            spawnInfiniteUniverses, summonElderGods, createDimensionStorm,
            spawnRealityGlitch, createMagicBigCrunch, summonCosmicHorrors,
            createTimeCollapse, spawnInfiniteMagic, createRealityFracture,
            summonPrimordialChaos, createMagicVoid, spawnUniverseReality,
            createMagicInfinity, summonAbsoluteChaos, createRealityEnd,
            spawnMagicEverything, createUltimateReality, createOmnipotentMagic,
            spawnRealityDestruction, createInfiniteChaos, createDimensionBreak,
            spawnMagicOverload, createRealityGlitch, summonCosmicEntities,
            createMagicSingularity, spawnUniverseCollapse, createTimeParadox,
            summonPrimordialForces, createMagicBigBang, spawnRealityWarp,
            createMagicVoid, summonEldritchHorrors, createDimensionStorm,
            spawnMagicApocalypse
        ];
        
        // Запускаем ВСЕ эффекты одновременно!
        allEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
            }, index * 2);
        });
        
        // Создаем ультимативный хаос портал
        const ultimateChaos = document.createElement('div');
        ultimateChaos.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 700px;
            height: 700px;
            border-radius: 50%;
            background: conic-gradient(
                #ff0000, #ff1000, #ff2000, #ff3000, #ff4000, #ff5000, #ff6000, #ff7000,
                #ff8000, #ff9000, #ffa000, #ffb000, #ffc000, #ffd000, #ffe000, #fff000,
                #ffff00, #f0ff00, #e0ff00, #d0ff00, #c0ff00, #b0ff00, #a0ff00, #90ff00,
                #80ff00, #70ff00, #60ff00, #50ff00, #40ff00, #30ff00, #20ff00, #10ff00,
                #00ff00, #00ff10, #00ff20, #00ff30, #00ff40, #00ff50, #00ff60, #00ff70,
                #00ff80, #00ff90, #00ffa0, #00ffb0, #00ffc0, #00ffd0, #00ffe0, #00fff0,
                #00ffff, #00f0ff, #00e0ff, #00d0ff, #00c0ff, #00b0ff, #00a0ff, #0090ff,
                #0080ff, #0070ff, #0060ff, #0050ff, #0040ff, #0030ff, #0020ff, #0010ff,
                #0000ff, #1000ff, #2000ff, #3000ff, #4000ff, #5000ff, #6000ff, #7000ff,
                #8000ff, #9000ff, #a000ff, #b000ff, #c000ff, #d000ff, #e000ff, #f000ff,
                #ff00ff, #ff00f0, #ff00e0, #ff00d0, #ff00c0, #ff00b0, #ff00a0, #ff0090,
                #ff0080, #ff0070, #ff0060, #ff0050, #ff0040, #ff0030, #ff0020, #ff0010,
                #ff0000
            );
            animation: ultimateChaosSpin 0.1s linear infinite;
            z-index: 9000;
            pointer-events: none;
        `;
        world.appendChild(ultimateChaos);
        
        setTimeout(() => {
            if (ultimateChaos.parentNode) {
                ultimateChaos.parentNode.removeChild(ultimateChaos);
            }
        }, 60000);
    }
    
    // Показ результата магии
    function showMagicResult() {
        const results = [
            '✨ Цвета мира изменились!',
            '🌈 Появилась радуга!',
            '💖 Сердечки летают повсюду!',
            '⚡ Молния осветила небо!',
            '💰 Сокровище найдено!',
            '☄️ Метеоритный дождь!',
            '🦋 Магические бабочки!',
            '🌌 Северное сияние!',
            '💎 Кристаллы появились!',
            '🌪️ Торнадо!',
            '🏝️ Новые острова!',
            '🌀 Магический портал!',
            '🐉 Дракон пролетел!',
            '🎆 Фейерверк!',
            '🌸 Цветы расцвели!',
            '🌟 УЛЬТИМАТИВНАЯ МАГИЯ!',
            '⛈️ Магический шторм!',
            '🦁 Магические существа!',
            '🌌 ГАЛАКТИКА СОЗДАНА!',
            '🌲 Магический лес вырос!',
            '⏰ Время искажено!',
            '🔥 Элементали призваны!',
            '🌊 Магический океан!',
            '👽 Космические существа!',
            '🌀 Разрыв измерений!',
            '🔥 Феникс восстал!',
            '🏔️ Магическая гора!',
            '✨ Звездная пыль!',
            '🏰 Магический город!',
            '👻 Древние духи!',
            '⚔️ Эпическая битва!',
            '🌺 Магический сад!',
            '🌀 Реальность искажена!',
            '🐲 МЕГА-ЗВЕРЬ!',
            '♾️ БЕСКОНЕЧНАЯ МАГИЯ!',
            '💥 ХАОТИЧЕСКОЕ ЦАРСТВО!',
            '🌌 ВСЕЛЕННАЯ СОЗДАНА!',
            '⏰ ВРЕМЕННОЙ ПАРАДОКС!',
            '⚡ БОГИ ПРИЗВАНЫ!',
            '🌌 МУЛЬТИВСЕЛЕННАЯ!',
            '💥 РЕАЛЬНОСТЬ СЛОМАНА!',
            '🔥 МАГИЧЕСКИЙ АПОКАЛИПСИС!',
            '👁️ ДРЕВНИЕ УЖАСЫ!',
            '🌀 КОЛЛАПС ИЗМЕРЕНИЙ!',
            '🌌 КОСМИЧЕСКИЕ СУЩНОСТИ!',
            '💥 БОЛЬШОЙ ВЗРЫВ!',
            '🐉 БЕСКОНЕЧНЫЕ ДРАКОНЫ!',
            '💥 ГЛИТЧ РЕАЛЬНОСТИ!',
            '🕳️ ЧЕРНАЯ ДЫРА!',
            '💀 КОНЕЦ ВСЕЛЕННОЙ!',
            '⚡ ПЕРВОБЫТНЫЕ СИЛЫ!',
            '🌀 МАГИЧЕСКАЯ СИНГУЛЯРНОСТЬ!',
            '🌀 ИСКАЖЕНИЕ РЕАЛЬНОСТИ!',
            '💥 УЛЬТИМАТИВНЫЙ ХАОС!',
            '💥 ПЕРЕГРУЗКА РЕАЛЬНОСТИ!',
            '🌌 БЕСКОНЕЧНЫЕ ВСЕЛЕННЫЕ!',
            '⚡ ДРЕВНИЕ БОГИ!',
            '🌀 ШТОРМ ИЗМЕРЕНИЙ!',
            '💥 ГЛИТЧ РЕАЛЬНОСТИ!',
            '💥 БОЛЬШОЙ ХРУСТ!',
            '👁️ КОСМИЧЕСКИЕ УЖАСЫ!',
            '⏰ КОЛЛАПС ВРЕМЕНИ!',
            '♾️ БЕСКОНЕЧНАЯ МАГИЯ!',
            '💥 РАЗЛОМ РЕАЛЬНОСТИ!',
            '💥 ПЕРВОБЫТНЫЙ ХАОС!',
            '🕳️ МАГИЧЕСКАЯ ПУСТОТА!',
            '🌌 РЕАЛЬНОСТЬ ВСЕЛЕННОЙ!',
            '♾️ МАГИЧЕСКАЯ БЕСКОНЕЧНОСТЬ!',
            '💥 АБСОЛЮТНЫЙ ХАОС!',
            '💀 КОНЕЦ РЕАЛЬНОСТИ!',
            '♾️ МАГИЧЕСКОЕ ВСЕ!',
            '🌌 УЛЬТИМАТИВНАЯ РЕАЛЬНОСТЬ!',
            '♾️ ВСЕМОГУЩАЯ МАГИЯ!',
            '💥 УНИЧТОЖЕНИЕ РЕАЛЬНОСТИ!',
            '💥 БЕСКОНЕЧНЫЙ ХАОС!',
            '⚡ ДРЕВНИЕ БОГИ!',
            '🌀 РАЗЛОМ ИЗМЕРЕНИЙ!',
            '💥 ПЕРЕГРУЗКА МАГИИ!',
            '💥 ГЛИТЧ РЕАЛЬНОСТИ!',
            '🌌 КОСМИЧЕСКИЕ СУЩНОСТИ!',
            '🌀 МАГИЧЕСКАЯ СИНГУЛЯРНОСТЬ!',
            '💥 КОЛЛАПС ВСЕЛЕННОЙ!',
            '⏰ ВРЕМЕННОЙ ПАРАДОКС!',
            '⚡ ПЕРВОБЫТНЫЕ СИЛЫ!',
            '💥 БОЛЬШОЙ ВЗРЫВ!',
            '🌀 ИСКАЖЕНИЕ РЕАЛЬНОСТИ!',
            '🕳️ МАГИЧЕСКАЯ ПУСТОТА!',
            '👁️ ДРЕВНИЕ УЖАСЫ!',
            '🌀 ШТОРМ ИЗМЕРЕНИЙ!',
            '🔥 МАГИЧЕСКИЙ АПОКАЛИПСИС!',
            '💥 УЛЬТИМАТИВНЫЙ ХАОС!'
        ];
        
        const resultText = results[Math.floor(Math.random() * results.length)];
        
        const resultBox = document.createElement('div');
        resultBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.95));
            color: #333;
            padding: 20px 40px;
            border-radius: 20px;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: resultAppear 0.5s ease-out;
            z-index: 2000;
            border: 3px solid #ff6b6b;
        `;
        resultBox.textContent = resultText;
        document.body.appendChild(resultBox);
        
        setTimeout(() => {
            if (resultBox.parentNode) {
                resultBox.style.animation = 'resultDisappear 0.5s ease-in forwards';
                setTimeout(() => {
                    if (resultBox.parentNode) {
                        resultBox.parentNode.removeChild(resultBox);
                    }
                }, 500);
            }
        }, 2000);
    }
    
    // Функция создания персонажей
    function createCharacters() {
        const characters = [
            {
                name: 'Мудрый Дракон',
                emoji: '🐉',
                x: 20,
                y: 30,
                color: '#ff6b6b',
                dialogues: [
                    'Привет, странник! Я страж этого мира.',
                    'Ты первый, кто прошел через магическую дверь!',
                    'Хочешь узнать секрет вечной мудрости?',
                    'Просто будь добрым к другим...'
                ]
            },
            {
                name: 'Волшебная Фея',
                emoji: '🧚‍♀️',
                x: 70,
                y: 20,
                color: '#4ecdc4',
                dialogues: [
                    'Ой! Кто это пришел в наш мир?',
                    'Я могу исполнить одно твое желание!',
                    'Но помни - желания должны быть добрыми.',
                    'Выбери мудро, маленький человечек!'
                ]
            },
            {
                name: 'Дружелюбный Единорог',
                emoji: '🦄',
                x: 30,
                y: 70,
                color: '#45b7d1',
                dialogues: [
                    'Привет! Я рад тебя видеть!',
                    'Хочешь прокатиться на моей спине?',
                    'Мы можем полететь к самым высоким облакам!',
                    'Это будет незабываемое приключение!'
                ]
            },
            {
                name: 'Загадочный Кот',
                emoji: '🐱',
                x: 80,
                y: 60,
                color: '#f9ca24',
                dialogues: [
                    'Мяу... Ты тоже видишь невидимые вещи?',
                    'В этом мире все не так, как кажется.',
                    'Я знаю, где спрятаны сокровища...',
                    'Но сначала докажи, что ты достоин!'
                ]
            }
        ];
        
        characters.forEach((char, index) => {
            const character = document.createElement('div');
            character.className = 'character';
            character.style.cssText = `
                position: absolute;
                left: ${char.x}%;
                top: ${char.y}%;
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, ${char.color}, ${char.color}dd);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                animation: characterFloat ${2 + index * 0.5}s infinite ease-in-out;
                border: 3px solid rgba(255,255,255,0.3);
            `;
            character.textContent = char.emoji;
            character.title = char.name;
            
            // Добавляем эффект пульсации
            character.addEventListener('mouseenter', () => {
                character.style.transform = 'scale(1.2)';
                character.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
                character.style.border = '3px solid rgba(255,255,255,0.8)';
            });
            
            character.addEventListener('mouseleave', () => {
                character.style.transform = 'scale(1)';
                character.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
                character.style.border = '3px solid rgba(255,255,255,0.3)';
            });
            
            // Обработчик клика для диалога
            character.addEventListener('click', () => {
                showDialogue(char);
            });
            
            world.appendChild(character);
        });
    }
    
    // Функция показа диалога
    function showDialogue(character) {
        // Удаляем предыдущий диалог, если есть
        const existingDialogue = document.querySelector('.dialogue-box');
        if (existingDialogue) {
            existingDialogue.remove();
        }
        
        // Создаем диалоговое окно
        const dialogueBox = document.createElement('div');
        dialogueBox.className = 'dialogue-box';
        dialogueBox.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(50,50,50,0.9));
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            border: 2px solid rgba(255,255,255,0.3);
            max-width: 400px;
            text-align: center;
            font-family: 'Arial', sans-serif;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: dialogueAppear 0.5s ease-out;
            z-index: 1000;
        `;
        
        // Случайный диалог
        const randomDialogue = character.dialogues[Math.floor(Math.random() * character.dialogues.length)];
        
        dialogueBox.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 10px; color: ${character.color};">
                ${character.emoji} ${character.name}
            </div>
            <div style="font-size: 16px; line-height: 1.4;">
                "${randomDialogue}"
            </div>
            <div style="font-size: 12px; margin-top: 15px; opacity: 0.7;">
                Нажмите в любом месте, чтобы закрыть
            </div>
        `;
        
        document.body.appendChild(dialogueBox);
        
        // Закрытие диалога по клику
        dialogueBox.addEventListener('click', () => {
            dialogueBox.style.animation = 'dialogueDisappear 0.3s ease-in forwards';
            setTimeout(() => {
                if (dialogueBox.parentNode) {
                    dialogueBox.parentNode.removeChild(dialogueBox);
                }
            }, 300);
        });
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            if (dialogueBox.parentNode) {
                dialogueBox.style.animation = 'dialogueDisappear 0.3s ease-in forwards';
                setTimeout(() => {
                    if (dialogueBox.parentNode) {
                        dialogueBox.parentNode.removeChild(dialogueBox);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Функция возврата в исходный мир
    function returnToOriginalWorld() {
        worldState = 0;
        isInOtherWorld = false;
        isDoorOpen = false;
        
        // Возвращаем исходный фон
        world.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        // Пересоздаем дверь
        setTimeout(() => {
            world.innerHTML = '';
            world.appendChild(door);
            world.appendChild(particles);
            door.style.opacity = '1';
            door.style.transform = 'perspective(1000px) rotateY(0deg)';
            doorHandle.style.transform = 'translateY(-50%) rotate(0deg)';
            portal.style.opacity = '0.7';
        }, 500);
    }
    
    // Обработчики событий для двери
    door.addEventListener('click', openDoor);
    
    door.addEventListener('mouseenter', () => {
        if (!isDoorOpen) {
            door.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1.05)';
            doorHandle.style.transform = 'translateY(-50%) scale(1.2)';
            door.style.boxShadow = '0 0 50px rgba(255,215,0,0.5), inset 0 0 30px rgba(255,255,255,0.2)';
        }
    });
    
    door.addEventListener('mouseleave', () => {
        if (!isDoorOpen) {
            door.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
            doorHandle.style.transform = 'translateY(-50%) scale(1)';
            door.style.boxShadow = '0 0 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.1)';
        }
    });
    
    // Добавляем CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes characterFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-5px) rotate(0deg); }
            75% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        @keyframes dialogueAppear {
            0% { 
                opacity: 0; 
                transform: translateX(-50%) translateY(50px) scale(0.8); 
            }
            100% { 
                opacity: 1; 
                transform: translateX(-50%) translateY(0px) scale(1); 
            }
        }
        
        @keyframes dialogueDisappear {
            0% { 
                opacity: 1; 
                transform: translateX(-50%) translateY(0px) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateX(-50%) translateY(-30px) scale(0.8); 
            }
        }
        
        @keyframes magicPulse {
            0%, 100% { 
                transform: scale(1); 
                box-shadow: 
                    0 0 30px rgba(255,107,107,0.6),
                    0 0 60px rgba(78,205,196,0.4),
                    0 0 90px rgba(69,183,209,0.3);
            }
            50% { 
                transform: scale(1.05); 
                box-shadow: 
                    0 0 40px rgba(255,107,107,0.8),
                    0 0 80px rgba(78,205,196,0.6),
                    0 0 120px rgba(69,183,209,0.5);
            }
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes magicExplosion {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes rainbowFloat {
            0% { 
                transform: translateY(0px) scale(0.5);
                opacity: 0;
            }
            50% { 
                transform: translateY(-20px) scale(1);
                opacity: 1;
            }
            100% { 
                transform: translateY(-40px) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes heartFloat {
            0% { 
                transform: translateY(0px) scale(0);
                opacity: 1;
            }
            50% { 
                transform: translateY(-200px) scale(1);
                opacity: 1;
            }
            100% { 
                transform: translateY(-400px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes lightning {
            0%, 100% { 
                opacity: 0;
                transform: scaleY(0);
            }
            10%, 90% { 
                opacity: 1;
                transform: scaleY(1);
            }
        }
        
        @keyframes treasureAppear {
            0% { 
                transform: translateX(-50%) scale(0) rotate(0deg);
                opacity: 0;
            }
            50% { 
                transform: translateX(-50%) scale(1.2) rotate(180deg);
                opacity: 1;
            }
            100% { 
                transform: translateX(-50%) scale(1) rotate(360deg);
                opacity: 1;
            }
        }
        
        @keyframes resultAppear {
            0% { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            100% { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes resultDisappear {
            0% { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
        }
        
        @keyframes meteorFall {
            0% { 
                transform: translateY(0px) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes butterflyFly {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
            }
            25% { 
                transform: translate(50px, -30px) rotate(5deg);
            }
            50% { 
                transform: translate(-30px, -60px) rotate(-5deg);
            }
            75% { 
                transform: translate(40px, -20px) rotate(3deg);
            }
        }
        
        @keyframes auroraWave {
            0%, 100% { 
                transform: translateX(0px) skewX(0deg);
                opacity: 0.3;
            }
            50% { 
                transform: translateX(20px) skewX(5deg);
                opacity: 0.7;
            }
        }
        
        @keyframes crystalGlow {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
                filter: brightness(1);
            }
            50% { 
                transform: scale(1.2) rotate(180deg);
                filter: brightness(1.5);
            }
        }
        
        @keyframes tornadoSpin {
            0% { 
                transform: translateX(-50%) rotate(0deg);
            }
            100% { 
                transform: translateX(-50%) rotate(360deg);
            }
        }
        
        @keyframes islandFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg);
            }
            50% { 
                transform: translateY(-20px) rotate(2deg);
            }
        }
        
        @keyframes portalSpin {
            0% { 
                transform: translateX(-50%) rotate(0deg);
                border-color: #ff6b6b;
            }
            25% { 
                border-color: #4ecdc4;
            }
            50% { 
                transform: translateX(-50%) rotate(180deg);
                border-color: #45b7d1;
            }
            75% { 
                border-color: #f9ca24;
            }
            100% { 
                transform: translateX(-50%) rotate(360deg);
                border-color: #ff6b6b;
            }
        }
        
        @keyframes dragonFly {
            0% { 
                transform: translateX(-200px) scale(0.5);
                opacity: 0;
            }
            20% { 
                opacity: 1;
            }
            50% { 
                transform: translateX(-50%) scale(1);
            }
            80% { 
                opacity: 1;
            }
            100% { 
                transform: translateX(200px) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes fireworkExplode {
            0% { 
                transform: scale(0);
                opacity: 1;
            }
            50% { 
                transform: scale(3);
                opacity: 0.8;
            }
            100% { 
                transform: scale(6);
                opacity: 0;
            }
        }
        
        @keyframes flowerBloom {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
            }
            50% { 
                transform: scale(1.3) rotate(10deg);
            }
        }
        
        @keyframes ultimatePulse {
            0%, 100% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.8;
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0.4;
            }
        }
        
        @keyframes magicRain {
            0% { 
                transform: translateY(0px);
                opacity: 1;
            }
            100% { 
                transform: translateY(100vh);
                opacity: 0;
            }
        }
        
        @keyframes windBlow {
            0%, 100% { 
                transform: translateX(-100%);
                opacity: 0;
            }
            50% { 
                transform: translateX(0%);
                opacity: 0.3;
            }
        }
        
        @keyframes beastRoam {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
            }
            25% { 
                transform: translate(100px, -50px) rotate(5deg);
            }
            50% { 
                transform: translate(-50px, -100px) rotate(-5deg);
            }
            75% { 
                transform: translate(80px, -30px) rotate(3deg);
            }
        }
        
        @keyframes galaxySpin {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg) translateX(${50 + Math.random() * 100}px);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg) translateX(${50 + Math.random() * 100}px);
            }
        }
        
        @keyframes galaxyCore {
            0%, 100% { 
                transform: translate(-50%, -50%) scale(1);
                filter: brightness(1);
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.2);
                filter: brightness(1.5);
            }
        }
        
        @keyframes treeGrow {
            0% { 
                transform: scale(0) translateY(50px);
                opacity: 0;
            }
            100% { 
                transform: scale(1) translateY(0px);
                opacity: 1;
            }
        }
        
        @keyframes mushroomGlow {
            0%, 100% { 
                transform: scale(1);
                filter: brightness(1);
            }
            50% { 
                transform: scale(1.1);
                filter: brightness(1.3);
            }
        }
        
        @keyframes timeWarpDistort {
            0%, 100% { 
                transform: skewX(0deg) scale(1);
                opacity: 0.1;
            }
            50% { 
                transform: skewX(5deg) scale(1.05);
                opacity: 0.3;
            }
        }
        
        @keyframes timeRing {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes elementalSummon {
            0% { 
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            50% { 
                transform: scale(1.2) rotate(180deg);
                opacity: 1;
            }
            100% { 
                transform: scale(1) rotate(360deg);
                opacity: 1;
            }
        }
        
        @keyframes waveMove {
            0%, 100% { 
                transform: translateX(-100%);
            }
            50% { 
                transform: translateX(100%);
            }
        }
        
        @keyframes seaSwim {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg);
            }
            50% { 
                transform: translateY(-20px) rotate(5deg);
            }
        }
        
        @keyframes cosmicFloat {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
            }
            25% { 
                transform: translate(50px, -30px) rotate(10deg);
            }
            50% { 
                transform: translate(-30px, -50px) rotate(-10deg);
            }
            75% { 
                transform: translate(40px, -20px) rotate(5deg);
            }
        }
        
        @keyframes dimensionRift {
            0%, 100% { 
                transform: translateX(-50%) scaleY(1);
                opacity: 1;
            }
            50% { 
                transform: translateX(-50%) scaleY(1.2);
                opacity: 0.8;
            }
        }
        
        @keyframes dimensionDistort {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
                opacity: 0.5;
            }
            50% { 
                transform: scale(1.2) rotate(180deg);
                opacity: 0.8;
            }
        }
        
        @keyframes phoenixRise {
            0% { 
                transform: translateX(-50%) translateY(100px) scale(0.5);
                opacity: 0;
            }
            50% { 
                transform: translateX(-50%) translateY(-20px) scale(1.2);
                opacity: 1;
            }
            100% { 
                transform: translateX(-50%) translateY(-100px) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes fireParticle {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes mountainRise {
            0% { 
                transform: translateX(-50%) scaleY(0);
            }
            100% { 
                transform: translateX(-50%) scaleY(1);
            }
        }
        
        @keyframes snowCapAppear {
            0% { 
                transform: translateX(-50%) scale(0);
                opacity: 0;
            }
            100% { 
                transform: translateX(-50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes stardustTwinkle {
            0%, 100% { 
                opacity: 0.3;
                transform: scale(1);
            }
            50% { 
                opacity: 1;
                transform: scale(1.2);
            }
        }
        
        @keyframes buildingRise {
            0% { 
                transform: translateY(100px) scale(0.5);
                opacity: 0;
            }
            100% { 
                transform: translateY(0px) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes windowLight {
            0%, 100% { 
                opacity: 0.3;
                transform: scale(1);
            }
            50% { 
                opacity: 1;
                transform: scale(1.2);
            }
        }
        
        @keyframes spiritFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-30px) rotate(10deg);
                opacity: 1;
            }
        }
        
        @keyframes battleFight {
            0%, 100% { 
                transform: translateX(0px) rotate(0deg);
            }
            25% { 
                transform: translateX(10px) rotate(5deg);
            }
            75% { 
                transform: translateX(-10px) rotate(-5deg);
            }
        }
        
        @keyframes battleExplosion {
            0% { 
                transform: scale(0);
                opacity: 1;
            }
            100% { 
                transform: scale(3);
                opacity: 0;
            }
        }
        
        @keyframes realityBend {
            0%, 100% { 
                transform: skewX(0deg) skewY(0deg);
                opacity: 0.1;
            }
            50% { 
                transform: skewX(5deg) skewY(3deg);
                opacity: 0.3;
            }
        }
        
        @keyframes realityDistort {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
                opacity: 0.3;
            }
            50% { 
                transform: scale(1.3) rotate(180deg);
                opacity: 0.6;
            }
        }
        
        @keyframes megaBeastRoar {
            0% { 
                transform: translateX(-50%) scale(0.5);
                opacity: 0;
            }
            20% { 
                opacity: 1;
            }
            50% { 
                transform: translateX(-50%) scale(1.3);
            }
            80% { 
                opacity: 1;
            }
            100% { 
                transform: translateX(-50%) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes shockwave {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes infiniteSpin {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        
        @keyframes chaosFloat {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.3;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes chaosSpin {
            0% { 
                transform: rotate(0deg) scale(1);
            }
            100% { 
                transform: rotate(360deg) scale(${0.5 + Math.random() * 1.5});
            }
        }
        
        @keyframes universeExpand {
            0% { 
                transform: scale(0);
                opacity: 0;
            }
            100% { 
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes starBirth {
            0% { 
                transform: scale(0);
                opacity: 0;
            }
            50% { 
                transform: scale(1.5);
                opacity: 1;
            }
            100% { 
                transform: scale(1);
                opacity: 0.8;
            }
        }
        
        @keyframes timeLoop {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes timeParadox {
            0%, 100% { 
                transform: rotate(0deg);
                opacity: 0.1;
            }
            50% { 
                transform: rotate(180deg);
                opacity: 0.3;
            }
        }
        
        @keyframes godSummon {
            0% { 
                transform: scale(0) translateY(100px);
                opacity: 0;
            }
            50% { 
                transform: scale(1.2) translateY(-20px);
                opacity: 1;
            }
            100% { 
                transform: scale(1) translateY(0px);
                opacity: 1;
            }
        }
        
        @keyframes divineGlow {
            0%, 100% { 
                opacity: 0.1;
                transform: scale(1);
            }
            50% { 
                opacity: 0.3;
                transform: scale(1.1);
            }
        }
        
        @keyframes multiverseFloat {
            0%, 100% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.3;
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.1);
                opacity: 0.6;
            }
        }
        
        @keyframes realityCrack {
            0% { 
                transform: scaleX(0);
                opacity: 0;
            }
            100% { 
                transform: scaleX(1);
                opacity: 1;
            }
        }
        
        @keyframes realityBreak {
            0%, 100% { 
                transform: translateX(0px);
                opacity: 0.1;
            }
            50% { 
                transform: translateX(10px);
                opacity: 0.3;
            }
        }
        
        @keyframes apocalypseGlow {
            0%, 100% { 
                opacity: 0.2;
                transform: scale(1);
            }
            50% { 
                opacity: 0.4;
                transform: scale(1.05);
            }
        }
        
        @keyframes eldritchFloat {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.8;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes horrorPulse {
            0%, 100% { 
                opacity: 0.2;
                transform: scale(1);
            }
            50% { 
                opacity: 0.4;
                transform: scale(1.1);
            }
        }
        
        @keyframes dimensionCollapse {
            0% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes cosmicEntity {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
            }
            25% { 
                transform: translate(50px, -30px) rotate(90deg);
            }
            50% { 
                transform: translate(-30px, -60px) rotate(180deg);
            }
            75% { 
                transform: translate(40px, -20px) rotate(270deg);
            }
        }
        
        @keyframes bigBang {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(10);
                opacity: 0;
            }
        }
        
        @keyframes bigBangParticle {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) translate(${(Math.random() - 0.5) * 1000}px, ${(Math.random() - 0.5) * 1000}px) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes infiniteDragon {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
            }
            25% { 
                transform: translate(100px, -50px) rotate(5deg);
            }
            50% { 
                transform: translate(-50px, -100px) rotate(-5deg);
            }
            75% { 
                transform: translate(80px, -30px) rotate(3deg);
            }
        }
        
        @keyframes realityGlitch {
            0%, 100% { 
                transform: translateX(0px);
                opacity: 0.1;
            }
            50% { 
                transform: translateX(${Math.random() * 10}px);
                opacity: 0.3;
            }
        }
        
        @keyframes glitchBlock {
            0% { 
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(1) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes blackHoleSpin {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        
        @keyframes blackHoleSuck {
            0% { 
                transform: translate(0px, 0px);
                opacity: 1;
            }
            100% { 
                transform: translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px);
                opacity: 0;
            }
        }
        
        @keyframes universeEnd {
            0% { 
                opacity: 0;
                transform: scale(1);
            }
            100% { 
                opacity: 1;
                transform: scale(1.2);
            }
        }
        
        @keyframes universeFragment {
            0% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes primordialForce {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            50% { 
                transform: scale(1.3) rotate(180deg);
                opacity: 0.8;
            }
        }
        
        @keyframes singularityCollapse {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
        
        @keyframes spaceTimeDistort {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
                opacity: 0.3;
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes realityWarp {
            0%, 100% { 
                transform: rotate(0deg);
                opacity: 0.1;
            }
            50% { 
                transform: rotate(180deg);
                opacity: 0.3;
            }
        }
        
        @keyframes warpFloat {
            0%, 100% { 
                transform: translate(0px, 0px) scale(1);
                opacity: 0.2;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(1.2);
                opacity: 0.6;
            }
        }
        
        @keyframes ultimateChaosSpin {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        
        @keyframes realityOverload {
            0%, 100% { 
                transform: translateX(0px);
                opacity: 0.1;
            }
            50% { 
                transform: translateX(${Math.random() * 20}px);
                opacity: 0.3;
            }
        }
        
        @keyframes infiniteUniverse {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
                opacity: 0.8;
            }
            50% { 
                transform: scale(1.2) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes elderGodSummon {
            0% { 
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            50% { 
                transform: scale(1.3) rotate(180deg);
                opacity: 1;
            }
            100% { 
                transform: scale(1) rotate(360deg);
                opacity: 1;
            }
        }
        
        @keyframes dimensionStorm {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.5;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes realityGlitchBlock {
            0% { 
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(1) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes bigCrunch {
            0% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.8;
            }
            100% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
        }
        
        @keyframes crunchElement {
            0% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes cosmicHorrorFloat {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.8;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes timeCollapse {
            0% { 
                transform: scaleY(1);
                opacity: 1;
            }
            100% { 
                transform: scaleY(0);
                opacity: 0;
            }
        }
        
        @keyframes infiniteMagicParticle {
            0%, 100% { 
                transform: translate(0px, 0px) scale(1);
                opacity: 0.3;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(1.5);
                opacity: 1;
            }
        }
        
        @keyframes realityFracture {
            0% { 
                transform: scaleX(0);
                opacity: 0;
            }
            100% { 
                transform: scaleX(1);
                opacity: 1;
            }
        }
        
        @keyframes chaosElement {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg) scale(1);
                opacity: 0.5;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px) rotate(180deg) scale(1.3);
                opacity: 1;
            }
        }
        
        @keyframes magicVoidExpand {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(20);
                opacity: 0;
            }
        }
        
        @keyframes voidSuck {
            0% { 
                transform: translate(0px, 0px);
                opacity: 1;
            }
            100% { 
                transform: translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 300}px);
                opacity: 0;
            }
        }
        
        @keyframes universeReality {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
                opacity: 0.4;
            }
            50% { 
                transform: scale(1.3) rotate(180deg);
                opacity: 0.8;
            }
        }
        
        @keyframes magicInfinity {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        
        @keyframes infinityParticle {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg) translateX(150px);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg) translateX(150px);
                opacity: 0;
            }
        }
        
        @keyframes absoluteChaosSpin {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        
        @keyframes realityEnd {
            0% { 
                opacity: 0;
                transform: scale(1);
            }
            100% { 
                opacity: 1;
                transform: scale(1.5);
            }
        }
        
        @keyframes realityFragment {
            0% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes magicEverything {
            0% { 
                transform: rotate(0deg);
            }
            100% { 
                transform: rotate(360deg);
            }
        }
        
        @keyframes ultimateRealitySpin {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        
        @keyframes omnipotentMagic {
            0% { 
                transform: rotate(0deg);
            }
            100% { 
                transform: rotate(360deg);
            }
        }
        
        @keyframes realityDestruction {
            0% { 
                opacity: 0;
                transform: scale(1);
            }
            100% { 
                opacity: 1;
                transform: scale(1.3);
            }
        }
        
        @keyframes realityDestructionFragment {
            0% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes infiniteChaos {
            0% { 
                transform: rotate(0deg);
            }
            100% { 
                transform: rotate(360deg);
            }
        }
        
        @keyframes infiniteChaosElement {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg) scale(1);
                opacity: 0.5;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 40}px, ${(Math.random() - 0.5) * 40}px) rotate(180deg) scale(1.5);
                opacity: 1;
            }
        }
        
        @keyframes dimensionBreak {
            0% { 
                transform: scaleX(0);
                opacity: 0;
            }
            100% { 
                transform: scaleX(1);
                opacity: 1;
            }
        }
        
        @keyframes magicOverload {
            0% { 
                transform: translateX(0px);
                opacity: 0.3;
            }
            100% { 
                transform: translateX(${Math.random() * 20}px);
                opacity: 0.3;
            }
        }
        
        @keyframes magicOverloadElement {
            0%, 100% { 
                transform: scale(1);
                opacity: 0.8;
            }
            50% { 
                transform: scale(1.3);
                opacity: 1;
            }
        }
        
        @keyframes realityGlitch {
            0%, 100% { 
                transform: translateX(0px);
                opacity: 0.1;
            }
            50% { 
                transform: translateX(${Math.random() * 15}px);
                opacity: 0.3;
            }
        }
        
        @keyframes realityGlitchBlock {
            0% { 
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(1) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes cosmicEntitySummon {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
            }
            25% { 
                transform: translate(60px, -40px) rotate(90deg);
            }
            50% { 
                transform: translate(-40px, -80px) rotate(180deg);
            }
            75% { 
                transform: translate(50px, -30px) rotate(270deg);
            }
        }
        
        @keyframes magicSingularityCollapse {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(25);
                opacity: 0;
            }
        }
        
        @keyframes spaceTimeDistortion {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
                opacity: 0.4;
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes universeCollapse {
            0% { 
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.9;
            }
            100% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
        }
        
        @keyframes universeCollapseElement {
            0% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes timeParadoxLoop {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes timeParadoxDistort {
            0%, 100% { 
                transform: rotate(0deg);
                opacity: 0.2;
            }
            50% { 
                transform: rotate(180deg);
                opacity: 0.4;
            }
        }
        
        @keyframes primordialForceSummon {
            0%, 100% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            50% { 
                transform: scale(1.4) rotate(180deg);
                opacity: 0.8;
            }
        }
        
        @keyframes magicBigBang {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(15);
                opacity: 0;
            }
        }
        
        @keyframes bigBangParticleExplosion {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) translate(${(Math.random() - 0.5) * 1200}px, ${(Math.random() - 0.5) * 1200}px) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes realityWarpDistort {
            0%, 100% { 
                transform: rotate(0deg);
                opacity: 0.2;
            }
            50% { 
                transform: rotate(180deg);
                opacity: 0.4;
            }
        }
        
        @keyframes realityWarpFloat {
            0%, 100% { 
                transform: translate(0px, 0px) scale(1);
                opacity: 0.3;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px) scale(1.3);
                opacity: 0.7;
            }
        }
        
        @keyframes magicVoidExpansion {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(25);
                opacity: 0;
            }
        }
        
        @keyframes voidElementSuck {
            0% { 
                transform: translate(0px, 0px);
                opacity: 1;
            }
            100% { 
                transform: translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px);
                opacity: 0;
            }
        }
        
        @keyframes eldritchHorrorFloat {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.8;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 80}px, ${(Math.random() - 0.5) * 80}px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes dimensionStormFloat {
            0%, 100% { 
                transform: translate(0px, 0px) rotate(0deg);
                opacity: 0.6;
            }
            50% { 
                transform: translate(${(Math.random() - 0.5) * 120}px, ${(Math.random() - 0.5) * 120}px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes magicApocalypseGlow {
            0%, 100% { 
                opacity: 0.3;
                transform: scale(1);
            }
            50% { 
                opacity: 0.5;
                transform: scale(1.1);
            }
        }
        
        @keyframes ultimateChaosSpin {
            0% { 
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% { 
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Создаем частицы периодически
    setInterval(createParticles, 3000);
    
    // Логируем успешную загрузку
    console.log('Виртуальная дверь создана! Вы можете войти в несуществующий мир...');
});
