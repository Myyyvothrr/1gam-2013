using UnityEngine;
using System.Collections;

public class Ship : MonoBehaviour
{
    public GameObject laser_prefab;

    public Transform[] laser_origins;

    protected int hitpoints = 1;

    public AudioClip sound_explosion;

    public GameObject debris_prefab;

    protected bool killed = false;

    void Start()
    {

    }

    void Update()
    {

    }

    public void fire(GameObject owner, Vector3 dir)
    {
        if (killed)
            return;

        for (int i = 0; i < laser_origins.Length; ++i)
        {
            GameObject obj = (GameObject)Instantiate(laser_prefab, laser_origins[i].position, Quaternion.identity);
            obj.SendMessage("set_owner", owner);
            obj.SendMessage("set_dir", dir);
        }
    }

    public virtual void receive_damage(int amount)
    {
        if (killed)
            return;

        hitpoints -= amount;

        if (hitpoints <= 0)
        {
            killed = true;
            audio.PlayOneShot(sound_explosion);
            collider.enabled = false;
            rigidbody.constraints = RigidbodyConstraints.None;
            Destroy(gameObject, 3f);

            GameObject obj;
            Vector3 pos = transform.position;
            int r = Random.Range(10, 20);
            for (int i = 0; i < r; ++i)
            {
                pos.x += Random.Range(-2f, 2f);
                pos.y += Random.Range(-1f, 1f);
                pos.z += Random.Range(-2f, 2f);
                obj = (GameObject)Instantiate(debris_prefab, pos, Quaternion.identity);
                obj.rigidbody.AddExplosionForce(Random.Range(300f, 800f), transform.position, Random.Range(20f, 40f));
            }

            rigidbody.AddExplosionForce(Random.Range(300f, 800f), transform.position, Random.Range(20f, 40f));
        }
    }

    public virtual void add_points(int amount)
    {
    }
}
