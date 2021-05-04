enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.powerUp.play()
    } else {
    	
    }
})
function initializeAnimations () {
    initializeHeroAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        4 4 1 1 1 1 1 1 1 1 1 1 1 4 4 . 
        4 1 1 4 4 4 4 4 4 4 4 4 1 1 4 . 
        4 1 4 4 1 1 1 1 1 1 1 4 4 1 4 . 
        4 1 4 1 1 1 1 1 1 1 1 1 4 1 4 . 
        4 1 4 1 1 1 1 1 1 1 1 1 4 1 4 . 
        4 1 4 1 1 1 1 1 1 1 1 1 4 1 4 . 
        4 1 4 1 1 1 1 1 1 1 1 1 4 1 4 . 
        4 1 4 1 1 1 1 1 1 1 1 1 4 1 4 . 
        4 1 4 1 1 1 1 1 1 1 1 1 4 1 4 . 
        4 1 4 1 1 1 1 1 1 1 1 1 4 1 4 . 
        4 1 4 4 1 1 1 1 1 1 1 4 4 1 4 . 
        4 1 1 4 4 4 4 4 4 4 4 4 1 1 4 . 
        4 4 1 1 1 1 1 1 1 1 1 1 1 4 4 . 
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . 6 6 6 5 5 6 6 6 . . . . 
        . . . 7 7 7 7 6 6 6 6 6 6 . . . 
        . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
        . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
        . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
        . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
        . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
        . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
        . . . 6 8 8 8 8 8 8 8 8 6 . . . 
        . . . . 6 6 8 8 8 8 6 6 . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    showInstruction("Break out of Prison")
    showInstruction("Jump with the up or A button.")
    showInstruction("Double jump by pressing jump again.")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d d d d d d d d d 5 5 d f . 
        . f d d f d d d d f d d 5 d f . 
        . f d d f d d d d f d d d 5 f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f 4 4 4 4 4 4 4 4 4 4 4 f . . 
        . f d d 4 4 4 4 4 4 d d d f . . 
        . f d f f f b b f f f d d f . . 
        . . f 4 4 4 4 4 4 4 4 4 b f . . 
        . . . f 4 4 b f f 4 4 b f . . . 
        . . . f 4 4 b f f 4 4 b f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d 5 5 d d d d d d d d d f . 
        . f d 5 d d f d d d d f d d f . 
        . f 5 d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b 4 4 4 4 4 4 4 4 4 4 f . 
        . . f d d d 4 4 4 4 4 4 d d f . 
        . . f d d f f f b b f f f d f . 
        . . f b 4 4 4 4 4 4 4 4 4 f . . 
        . . . f b 4 4 f f b 4 4 f . . . 
        . . . f b 4 4 f f b 4 4 f . . . 
        . . . . f f f . . f f f . . . . 
        `)
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_7`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    }
    initializeLevel(level)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f 5 5 5 5 5 5 5 f . . . . . 
        . f 5 5 5 5 5 5 5 5 5 f . . . . 
        . f d d d d 5 d d 5 5 f . . . . 
        . f d d f d d 5 d 5 5 f . . . . 
        . f d d f d d d 5 5 5 f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f 4 4 4 4 4 4 4 b f . . . . 
        . . f 4 4 d d d 4 4 b f . . . . 
        . . f b f f d d f f f f . . . . 
        . . f 4 4 4 4 4 4 4 b f . . . . 
        . . . f 4 4 4 4 b f f . . . . . 
        . . . f 4 4 4 4 b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f 5 5 5 5 5 5 5 f . . . . . 
        . f 5 5 5 5 5 5 5 5 5 f . . . . 
        . f d d d d 5 d d 5 5 f . . . . 
        . f d d f d d 5 d 5 5 f . . . . 
        . f d d f d d d 5 5 5 f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f 4 4 4 4 4 4 4 b f . . . . 
        . . f 4 4 4 4 d d 4 b f . . . . 
        . . f b f f d d d f f f f . . . 
        . . f 4 4 4 4 4 4 4 4 b f f . . 
        . . . f 4 4 b f f 4 4 4 f f . . 
        . . . . f f f . f f f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f 5 5 5 5 5 5 5 f . . . . . 
        . f 5 5 5 5 5 5 5 5 5 f . . . . 
        . f d d d d 5 d d 5 5 f . . . . 
        . f d d f d d 5 d 5 5 f . . . . 
        . f d d f d d d 5 5 5 f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f 4 4 4 4 4 4 4 b f . . . . 
        . . f 4 4 d d d 4 4 b f . . . . 
        . . f b f f d d f f f f . . . . 
        . . f 4 4 4 4 4 4 4 b f . . . . 
        . . . f 4 4 4 4 b f f . . . . . 
        . . . f 4 4 4 4 b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f 5 5 5 5 5 5 5 f . . . . . 
        . f 5 5 5 5 5 5 5 5 5 f . . . . 
        . f d d d d 5 d d 5 5 f . . . . 
        . f d d f d d 5 d 5 5 f . . . . 
        . f d d f d d d 5 5 5 f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f 4 4 4 4 4 4 4 b f . . . . 
        . f d d d b 4 4 4 4 b f . . . . 
        f f f d d f f f f f f f . . . . 
        f f f 4 4 4 4 4 4 4 b f . . . . 
        . f 4 4 b f 4 4 b f f . . . . . 
        . f f f f . f f f . . . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f 5 5 5 5 5 5 5 f . . 
        . . . . f 5 5 5 5 5 5 5 5 5 f . 
        . . . . f 5 5 d d 5 d d d d f . 
        . . . . f 5 5 d 5 d d f d d f . 
        . . . . f 5 5 5 d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b 4 4 4 4 4 4 4 f . . 
        . . . . f b 4 4 d d d 4 4 f . . 
        . . . . f f f f d d f f b f . . 
        . . . . f b 4 4 4 4 4 4 4 f . . 
        . . . . . f f b 4 4 4 4 f . . . 
        . . . . . . f b 4 4 4 4 f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f 5 5 5 5 5 5 5 f . . 
        . . . . f 5 5 5 5 5 5 5 5 5 f . 
        . . . . f 5 5 d d 5 d d d d f . 
        . . . . f 5 5 d 5 d d f d d f . 
        . . . . f 5 5 5 d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b 4 4 4 4 4 4 4 f . . 
        . . . . f b 4 d d 4 4 4 4 f . . 
        . . . f f f f d d d f f b f . . 
        . . f f b 4 4 4 4 4 4 4 4 f . . 
        . . f f 4 4 4 f f b 4 4 f . . . 
        . . . f f f f . . f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f 5 5 5 5 5 5 5 f . . 
        . . . . f 5 5 5 5 5 5 5 5 5 f . 
        . . . . f 5 5 d d 5 d d d d f . 
        . . . . f 5 5 d 5 d d f d d f . 
        . . . . f 5 5 5 d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b 4 4 4 4 4 4 4 f . . 
        . . . . f b 4 4 d d d 4 4 f . . 
        . . . . f f f f d d f f b f . . 
        . . . . f b 4 4 4 4 4 4 4 f . . 
        . . . . . f f b 4 4 4 4 f . . . 
        . . . . . . f b 4 4 4 4 f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f 5 5 5 5 5 5 5 f . . 
        . . . . f 5 5 5 5 5 5 5 5 5 f . 
        . . . . f 5 5 d d 5 d d d d f . 
        . . . . f 5 5 d 5 d d f d d f . 
        . . . . f 5 5 5 d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b 4 4 4 4 4 4 4 f . . 
        . . . . f b 4 4 4 4 b d d d f . 
        . . . . f f f f f f f d d f f f 
        . . . . f b 4 4 4 4 4 4 4 f f f 
        . . . . . f f b 4 4 f b 4 4 f . 
        . . . . . . . f f f . f f f . . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d d d d d d d d d 5 5 d f . 
        . f d d f d d d d f d d 5 d f . 
        . f d d f d d d d f d d d 5 f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f 4 4 4 4 4 4 4 4 4 4 b f . . 
        . f d d 4 4 4 4 4 4 d d d f . . 
        . f d f f f b b f f f d d f . . 
        . . f 4 4 4 4 4 4 4 4 4 b f . . 
        . . . f 4 4 b f f 4 4 b f . . . 
        . . . f 4 4 b f f 4 4 b f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d d d d d d d d d 5 5 d f . 
        . f d d f d d d d f d d 5 d f . 
        . f d d f d d d d f d d d 5 f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f 4 4 4 4 4 4 4 4 4 4 b f . . 
        . f d d 4 4 4 4 4 4 d d d f . . 
        . f d f f f b b f f f d d f . . 
        . . f 4 4 4 4 4 4 4 4 4 b f . . 
        . . . f 4 4 b f f 4 4 b f . . . 
        . . . . f f f . . f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f 5 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
            . f d d d d d d d d d 5 5 d f . 
            . f d d f d d d d f d d 5 d f . 
            . f d d f d d d d f d d d 5 f . 
            . f d d f d d d d f d d d f . . 
            . f d d d d d d d d d d d f f . 
            . d 4 b 4 4 4 4 4 4 4 4 b 4 d . 
            . d 4 4 4 4 4 4 4 4 4 4 4 4 d . 
            . f f f f f b b f f f f f f f . 
            . . f 4 4 4 4 4 4 4 4 4 b f . . 
            . . . f 4 4 b f f 4 4 b f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d 5 5 d d d d d d d d d f . 
        . f d 5 d d f d d d d f d d f . 
        . f 5 d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b 4 4 4 4 4 4 4 4 4 4 f . 
        . . f d d d 4 4 4 4 4 4 d d f . 
        . . f d d f f f b b f f f d f . 
        . . f b 4 4 4 4 4 4 4 4 4 f . . 
        . . . f b 4 4 f f b 4 4 f . . . 
        . . . f b 4 4 f f b 4 4 f . . . 
        . . . . f f f . . f f f . . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d 5 5 d d d d d d d d d f . 
        . f d 5 d d f d d d d f d d f . 
        . f 5 d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b 4 4 4 4 4 4 4 4 4 4 f . 
        . . f d d d 4 4 4 4 4 4 d d f . 
        . . f d d f f f b b f f f d f . 
        . . f b 4 4 4 4 4 4 4 4 4 f . . 
        . . . f b 4 4 f f b 4 4 f . . . 
        . . . . f f f . . f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f f f . . . 
            . . f 5 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
            . f d 5 5 d d d d d d d d d f . 
            . f d 5 d d f d d d d f d d f . 
            . f 5 d d d f d d d d f d d f . 
            . . f d d d f d d d d f d d f . 
            . f f d d d d d d d d d d d f . 
            . d 4 b 4 4 4 4 4 4 4 4 b 4 d . 
            . d 4 4 4 4 4 4 4 4 4 4 4 4 d . 
            . f f f f f f f b b f f f f f . 
            . . f b 4 4 4 4 4 4 4 4 4 f . . 
            . . . f b 4 4 f f b 4 4 f . . . 
            . . . . f f f . . f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d d d d d d d d d 5 5 d f . 
        . f d d f d d d d f d d 5 d f . 
        . f d d f d d d d f d d d 5 f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f 4 4 4 4 4 4 4 4 4 4 b f . . 
        . f d 4 4 4 4 4 4 4 4 4 d d f . 
        f d d f f f b b f f f f d d f . 
        . f f 4 4 4 4 4 4 4 4 4 b f . . 
        . . . f f f f . f f f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f 5 5 5 5 5 5 5 5 5 5 f . . 
        . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
        . f d 5 5 d d d d d d d d d f . 
        . f d 5 d d f d d d d f d d f . 
        . f 5 d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b 4 4 4 4 4 4 4 4 4 4 f . 
        . f d d 4 4 4 4 4 4 4 4 4 d f . 
        . f d d f f f f b b f f f d d f 
        . . f b 4 4 4 4 4 4 4 4 4 f f . 
        . . . f f f f f . f f f f . . . 
        `)
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Next level unlocked!")
        setLevelTileMap(currentLevel)
    } else {
        game.over(true, effects.confetti)
    }
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 8 8 f f f . . . . 
        . . . f f f 8 8 8 8 f f f . . . 
        . . f f f 8 8 5 5 8 8 f f f . . 
        . . f f 8 8 8 8 8 8 8 8 8 f . . 
        . . f 8 8 f f f f f f 8 8 f . . 
        . . f f f f d d d d f f f f . . 
        . f f e f b f d d f b f e f f . 
        . f e e d 1 f d d f 1 d e e f . 
        . . f e d d d d d d d d e f . . 
        . . . f d d d d d d d d f . . . 
        . . 8 8 f 8 8 8 8 8 8 f 8 8 . . 
        . . 8 8 f 8 8 8 8 5 8 f 8 8 . . 
        . . d d f 8 8 8 8 8 8 f d d . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)) {
        bumper = sprites.create(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 8 8 f f f . . . . 
            . . . f f f 8 8 8 8 f f f . . . 
            . . f f f 8 8 5 5 8 8 f f f . . 
            . . f f 8 8 8 8 8 8 8 8 8 f . . 
            . . f 8 8 f f f f f f 8 8 f . . 
            . . f f f f d d d d f f f f . . 
            . f f e f b f d d f b f e f f . 
            . f e e d 1 f d d f 1 d e e f . 
            . . f e d d d d d d d d e f . . 
            . . . f d d d d d d d d f . . . 
            . . 8 8 f 8 8 8 8 8 8 f 8 8 . . 
            . . 8 8 f 8 8 8 8 5 8 f 8 8 . . 
            . . d d f 8 8 8 8 8 8 f d d . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
}
function initializeLevel (level: number) {
    effects.clouds.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
function hasNextLevel () {
    return currentLevel != levelCount
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(img`
        b d d d d d d c b d d d d d d c 
        d b b b b b 6 6 6 6 b b b b b c 
        d b b b 6 6 6 5 5 6 6 6 b b b c 
        d b b 7 7 7 7 6 6 6 6 6 6 b b c 
        d b 6 7 7 7 7 8 8 8 1 1 6 6 b c 
        d b 7 7 7 7 7 8 8 8 1 1 5 6 b c 
        d 6 7 7 7 7 8 8 8 8 8 5 5 6 6 b 
        c 6 7 7 7 8 8 8 6 6 6 6 5 6 6 a 
        b 6 6 7 7 8 8 6 6 6 6 6 6 6 6 c 
        d 6 8 7 7 8 8 6 6 6 6 6 6 6 6 c 
        d b 6 8 7 7 8 6 6 6 6 6 8 6 b c 
        d b 6 8 8 7 8 8 6 6 6 8 6 6 b c 
        d b b 6 8 8 8 8 8 8 8 8 6 b b c 
        d b b b 6 6 8 8 8 8 6 6 b b b c 
        d b b b b b 6 6 6 6 b b b b b b 
        c c c c c c b a b c c c c c c a 
        `)) {
        coin = sprites.create(img`
            b d d d d d d c b d d d d d d c 
            d b b b b b 6 6 6 6 b b b b b c 
            d b b b 6 6 6 5 5 6 6 6 b b b c 
            d b b 7 7 7 7 6 6 6 6 6 6 b b c 
            d b 6 7 7 7 7 8 8 8 1 1 6 6 b c 
            d b 7 7 7 7 7 8 8 8 1 1 5 6 b c 
            d 6 7 7 7 7 8 8 8 8 8 5 5 6 6 b 
            c 6 7 7 7 8 8 8 6 6 6 6 5 6 6 a 
            b 6 6 7 7 8 8 6 6 6 6 6 6 6 6 c 
            d 6 8 7 7 8 8 6 6 6 6 6 6 6 6 c 
            d b 6 8 7 7 8 6 6 6 6 6 8 6 b c 
            d b 6 8 8 7 8 8 6 6 6 8 6 6 b c 
            d b b 6 8 8 8 8 8 8 8 8 6 b b c 
            d b b b 6 6 8 8 8 8 6 6 b b b c 
            d b b b b b 6 6 6 6 b b b b b b 
            c c c c c c b a b c c c c c c a 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let bumper: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . f f f f f f f f f f . . . 
    . . f 5 5 5 5 5 5 5 5 5 5 f . . 
    . f 5 5 5 5 5 5 5 5 5 5 5 5 f . 
    . f d 5 5 d d d d d d d d d f . 
    . f d 5 d d f d d d d f d d f . 
    . f 5 d d d f d d d d f d d f . 
    . . f d d d f d d d d f d d f . 
    . . f d d d d d d d d d d d f . 
    . . f b 4 4 4 4 4 4 4 4 4 4 f . 
    . . f d d d 4 4 4 4 4 4 d d f . 
    . . f d d f f f b b f f f d f . 
    . . f b 4 4 4 4 4 4 4 4 4 f . . 
    . . . f b 4 4 f f b 4 4 f . . . 
    . . . f b 4 4 f f b 4 4 f . . . 
    . . . . f f f . . f f f . . . . 
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
let invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
initializeAnimations()
createPlayer(hero)
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.CrouchLeft)
        } else {
            animation.setAction(hero, ActionKind.CrouchRight)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.IdleLeft)
        } else {
            animation.setAction(hero, ActionKind.IdleRight)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Flying)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Idle)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
