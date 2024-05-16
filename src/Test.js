import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import testTexture from './assets/test.svg';
import testTexture2 from './assets/test2.svg';
import testTexture3 from './assets/test3.svg';
import headTexture from './assets/headshot.png';
import headTopTexture from './assets/head.png';


export default function Test(){
  const engineRef = useRef();
  const renderRef = useRef();
  const runnerRef = useRef();
  const mouseConstraintRef = useRef();

  useEffect(() => {
    const { Engine, Render, Runner, MouseConstraint, Constraint, Mouse, Composite, Bodies } = Matter;

    // create engine
    engineRef.current = Engine.create();
    const world = engineRef.current.world;

    // create renderer
    renderRef.current = Render.create({
      element: document.getElementsByClassName('App'),
      canvas: document.getElementById('test'),
      engine: engineRef.current,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: '#C73D1D',
        pixelRatio: window.devicePixelRatio // here
      },
    });
    Render.run(renderRef.current);

    // create runner
    runnerRef.current = Runner.create();
    Runner.run(runnerRef.current, engineRef.current);

    // add bodies
    Composite.add(world, [
        Bodies.rectangle(400, 100, 377, 86, { 
            render: {
            sprite: {
                texture: testTexture,
            }
            }
        }),
        Bodies.rectangle(400, 100, 71, 61, { 
            render: {
            sprite: {
                texture: testTexture2,
            }
            }
        }),        
        Bodies.rectangle(400, 100, 455, 92, { 
            render: {
            sprite: {
                texture: testTexture3,
            }
            }
        }),
        Bodies.rectangle(400, 150, 452, 332, { 
            isStatic: true,
            collisionFilter: {
                category: 0x0000,
                mask: 0x0000
            },
            render: {
                sprite: {
                    texture: headTexture,
                }
            }
        }),


        // walls
        Bodies.rectangle(400, -25, 850, 50, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}}), // Top wall
        Bodies.rectangle(400, 625, 850, 50, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}}), // Bottom wall
        Bodies.rectangle(825, 300, 50, 650, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}}), // Right wall
        Bodies.rectangle(-25, 300, 50, 650, { isStatic: true, render: {fillStyle: 'rgba(0, 0, 0, 0)'}}), // Left wall
    ]);


    // Create the dangle rectangle
    const dangleRect = Bodies.rectangle(415, 365, 239, 80, { 
        render: {
            sprite: {
                texture: headTopTexture,
            }
        }
    })
    dangleRect.gravityScale = 0.1; // Adjust this value as needed (lower value means weaker gravity)

    // Add the dangle rectangle to the world
    Composite.add(world, dangleRect);

    // Create a constraint to fix the top right corner
    const constraintOptions = {
        pointA: { x: 530, y: 310 },
        bodyB: dangleRect,
        pointB: { x: 120, y: -50 },
        stiffness: 1,
        length: 0,
        render: {visible: false}
    };

    // Create the constraint
    const constraint = Constraint.create(constraintOptions);

    // Add the constraint to the world
    Composite.add(world, constraint);


    // add mouse control
    const mouse = Mouse.create(renderRef.current.canvas);
    mouseConstraintRef.current = MouseConstraint.create(engineRef.current, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(world, mouseConstraintRef.current);

    // keep the mouse in sync with rendering
    renderRef.current.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(renderRef.current, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });

    // Cleanup function
    return () => {
      // Stop rendering
      Render.stop(renderRef.current);

      // Stop running the engine
      Runner.stop(runnerRef.current);

      // Clear the engine
      Engine.clear(engineRef.current);

      // Destroy the mouse constraint
      Composite.remove(world, mouseConstraintRef.current);
    };
  }, []);

  return (
    <canvas id="test" width="800" height="600" style={{"border-radius": '20px'}} />
    );
};
