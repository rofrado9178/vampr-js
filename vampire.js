class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.creator === null) {
      return true;
    }
    if (this.offspring.includes(vampire)) {
      return true;
    }
    return false;
  }

  /** Stretch **/
  isDirectAcesstor(vampire) {
    if (this.offspring.includes(vampire)) {
      return true;
    } else {
      for (const vamp of this.offspring) {
        if (vamp.isDirectAcesstor(vampire)) {
          return true;
        }
      }
    }
  }
  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }
    let senior;
    let junior;

    if (this.isMoreSeniorThan(vampire)) {
      senior = this;
      junior = vampire;
    } else {
      junior = this;
      senior = vampire;
    }

    if (senior.isDirectAcesstor(junior)) {
      return senior;
    } else {
      return senior.creator.closestCommonAncestor(junior);
    }

    // if (vampire.creator === this.creator) {
    //   return this;
    // }

    // if (this.offspring.includes(vampire.creator)) {
    //   return this.vampire;
    // }
    // return vampire;
  }
}

module.exports = Vampire;
