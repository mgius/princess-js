import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  move_to, selectPlayerState
} from './playerSlice';
import styles from '../counter/Counter.module.css';
import { O_WRONLY } from 'constants';

function spin() {
  return Math.floor(Math.random() * 4) + 1
}

function Jewelry(props: { worn: boolean, name: string }) {
  const { worn, name } = props;
  return (
    <span className={worn ? styles.valueWorn : styles.valueUnworn}>
      {name}
    </span>
  )
}

function PlayerEquipment() {
  const player = useAppSelector(selectPlayerState);

  return (
    <div>
      <Jewelry worn={player.bracelet} name="Bracelet" />
      <Jewelry worn={player.necklace} name="Necklace" />
      <Jewelry worn={player.crown} name="Crown" />
      <Jewelry worn={player.ring} name="Ring" />
      <Jewelry worn={player.mysteryRing} name="Mystery Ring" />
      <Jewelry worn={player.earrings > 0} name="Left Earring" />
      <Jewelry worn={player.earrings > 1} name="Right Earring" />
      <span className={styles.value}>
        {player.board_position}
      </span>
    </div>
  )
}

export function Player() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row}>
        <PlayerEquipment />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(move_to(spin()))
          }}
        >
          Spin and Move
        </button>
      </div>
    </div>
  );
}
