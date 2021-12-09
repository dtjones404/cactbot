import EffectId from "../../../resources/effect_id";
import TimerBox from "../../../resources/timerbox";
import { JobDetail } from "../../../types/event";
import { ResourceBox } from "../bars";
import { kAbility } from "../constants";
import { PartialFieldMatches } from "../event_emitter";

import { BaseComponent, ComponentInterface } from "./base";

export class BLMComponent extends BaseComponent {
  thunderDot: TimerBox;
  thunderProc: TimerBox;
  fireProc: TimerBox;
  xenoStacks: HTMLElement[];
  heartStacks: HTMLElement[];
  umbralTimer: ResourceBox;
  xenoTimer: ResourceBox;

  umbralStacks: number;

  constructor(o: ComponentInterface) {
    super(o);

    this.umbralStacks = 0;

    // It'd be super nice to use grid here.
    // Maybe some day when cactbot uses new cef.
    const stacksContainer = document.createElement("div");
    stacksContainer.id = "blm-stacks";
    this.bars.addJobBarContainer().appendChild(stacksContainer);

    const heartStacksContainer = document.createElement("div");
    heartStacksContainer.id = "blm-stacks-heart";
    stacksContainer.appendChild(heartStacksContainer);
    this.heartStacks = [];
    for (let i = 0; i < 3; ++i) {
      const d = document.createElement("div");
      heartStacksContainer.appendChild(d);
      this.heartStacks.push(d);
    }

    const xenoStacksContainer = document.createElement("div");
    xenoStacksContainer.id = "blm-stacks-xeno";
    stacksContainer.appendChild(xenoStacksContainer);
    this.xenoStacks = [];
    for (let i = 0; i < 2; ++i) {
      const d = document.createElement("div");
      xenoStacksContainer.appendChild(d);
      this.xenoStacks.push(d);
    }

    this.umbralTimer = this.bars.addResourceBox({
      classList: ["blm-umbral-timer"],
    });
    this.xenoTimer = this.bars.addResourceBox({
      classList: ["blm-xeno-timer"],
    });
  }

  override onJobDetailUpdate(jobDetail: JobDetail["BLM"]): void {
    // FIXME: make it able to use after refactoring
    if (this.umbralStacks !== jobDetail.umbralStacks) {
      this.umbralStacks = jobDetail.umbralStacks;
      this.bars._updateMPTicker({
        mp: this.player.mp,
        maxMp: this.player.maxMp,
        umbralStacks: this.umbralStacks,
        inCombat: this.inCombat,
      });
    }
    const fouls = jobDetail.foulCount;
    for (let i = 0; i < 2; ++i) {
      if (fouls > i) this.xenoStacks[i]?.classList.add("active");
      else this.xenoStacks[i]?.classList.remove("active");
    }
    const hearts = jobDetail.umbralHearts;
    for (let i = 0; i < 3; ++i) {
      if (hearts > i) this.heartStacks[i]?.classList.add("active");
      else this.heartStacks[i]?.classList.remove("active");
    }

    const stacks = jobDetail.umbralStacks;
    const seconds = (jobDetail.umbralMilliseconds / 1000.0).toPrecision(2);
    const p = this.umbralTimer.parentNode;
    if (stacks && +seconds < 5) {
      p.classList.add("pulse");
    }
    if (!stacks) {
      this.umbralTimer.innerText = "";
      p.classList.remove("fire");
      p.classList.remove("ice");
    } else if (stacks > 0) {
      this.umbralTimer.innerText = seconds;
      p.classList.add("fire");
      p.classList.remove("ice");
    } else {
      this.umbralTimer.innerText = seconds;
      p.classList.remove("fire");
      p.classList.add("ice");
    }

    const xp = this.xenoTimer.parentNode;
    if (!jobDetail.enochian) {
      this.xenoTimer.innerText = "";
      xp.classList.remove("active", "pulse");
    } else {
      const nextPoly = jobDetail.nextPolyglotMilliseconds;
      const maxPoly = this.bars.player.level === 80 ? 2 : 1;
      this.xenoTimer.innerText = Math.ceil(nextPoly / 1000.0).toString();
      xp.classList.add("active");

      if (fouls === maxPoly && nextPoly < 5000) xp.classList.add("pulse");
      else xp.classList.remove("pulse");
    }
  }

  override reset(): void {
    this.thunderDot.duration = 0;
    this.thunderProc.duration = 0;
    this.fireProc.duration = 0;

    this.umbralStacks = 0;
  }
}
