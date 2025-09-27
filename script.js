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
        returnButton.addEventListener('click', returnToOriginalWorld);
        returnButton.addEventListener('mouseenter', () => {
            returnButton.style.transform = 'translateX(-50%) scale(1.1)';
        });
        returnButton.addEventListener('mouseleave', () => {
            returnButton.style.transform = 'translateX(-50%) scale(1)';
        });
    }
    
    // Функция магического действия
    function performMagic() {
        // Создаем взрыв частиц
        createMagicExplosion();
        
        // Случайные магические эффекты
        const effects = [
            () => changeWorldColors(),
            () => createRainbow(),
            () => spawnFloatingHearts(),
            () => createLightning(),
            () => summonTreasure(),
            () => createMeteorShower(),
            () => spawnMagicButterflies(),
            () => createAuroraBorealis(),
            () => summonMagicCrystals(),
            () => createTornado(),
            () => spawnFloatingIslands(),
            () => createMagicPortal(),
            () => summonDragon(),
            () => createFireworks(),
            () => spawnMagicFlowers(),
            () => createUltimateMagic(), // Комбинированный эффект
            () => createMagicStorm(), // Шторм магии
            () => summonMagicBeasts(), // Магические существа
            () => createGalaxy(), // Галактика
            () => spawnMagicForest(), // Магический лес
            () => createTimeWarp(), // Искажение времени
            () => summonElementals(), // Элементали
            () => createMagicOcean(), // Магический океан
            () => spawnCosmicBeings(), // Космические существа
            () => createDimensionRift(), // Разрыв измерений
            () => summonPhoenix(), // Феникс
            () => createMagicMountain(), // Магическая гора
            () => spawnStardust(), // Звездная пыль
            () => createMagicCity(), // Магический город
            () => summonAncientSpirits(), // Древние духи
            () => createEpicBattle(), // Эпическая битва
            () => spawnMagicGarden(), // Магический сад
            () => createRealityBend(), // Искажение реальности
            () => summonMegaBeast(), // Мега-зверь
            () => createInfiniteMagic(), // Бесконечная магия
            () => createChaosRealm(), // Хаотическое царство
            () => spawnUniverse(), // Создание вселенной
            () => createTimeParadox(), // Временной парадокс
            () => summonGods(), // Призыв богов
            () => createMultiverse(), // Мультивселенная
            () => spawnRealityBreaker(), // Ломатель реальности
            () => createMagicApocalypse(), // Магический апокалипсис
            () => summonEldritchHorrors(), // Древние ужасы
            () => createDimensionCollapse(), // Коллапс измерений
            () => spawnCosmicEntities(), // Космические сущности
            () => createMagicBigBang(), // Магический Большой взрыв
            () => summonInfiniteDragons(), // Бесконечные драконы
            () => createRealityGlitch(), // Глитч реальности
            () => spawnMagicBlackHole(), // Магическая черная дыра
            () => createUniverseEnd(), // Конец вселенной
            () => summonPrimordialForces(), // Первобытные силы
            () => createMagicSingularity(), // Магическая сингулярность
            () => spawnRealityWarp(), // Искажение реальности
            () => createUltimateChaos() // Ультимативный хаос
        ];
        
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
        
        // Иногда создаем двойной эффект
        if (Math.random() < 0.3) {
            setTimeout(() => {
                const secondEffect = effects[Math.floor(Math.random() * effects.length)];
                secondEffect();
            }, 1000);
        }
        
        // Показываем сообщение о результате
        showMagicResult();
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
            '♾️ БЕСКОНЕЧНАЯ МАГИЯ!'
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
    `;
    document.head.appendChild(style);
    
    // Создаем частицы периодически
    setInterval(createParticles, 3000);
    
    // Логируем успешную загрузку
    console.log('Виртуальная дверь создана! Вы можете войти в несуществующий мир...');
});
