using UnityEngine;
using System.Collections;

public class Laser : MonoBehaviour
{
    private float _movement = 45f;

    private Vector3 _dir;
    private GameObject _owner;
    private int _damage = 1;

    public AudioClip sound_laser;
    public AudioClip sound_damaged;
    
    void Start()
    {
        audio.PlayOneShot(sound_laser);
    }

    void Update()
    {
        transform.Translate(_dir * _movement * Time.deltaTime, Space.World);
        if (transform.position.z > 110)
        {
            Destroy(gameObject);
        }
    }
    
    void OnCollisionEnter(Collision collision)
    {
        if (collision.collider.tag.Equals("Cloud"))
            return;

        if (gameObject.tag.Equals(collision.collider.gameObject.tag))
            return;

        if (!collision.collider.tag.Equals("Wall"))
        {
            collision.collider.gameObject.SendMessage("receive_damage", _damage);
            
            if (_owner != null)
                _owner.SendMessage("add_points", 1);
        }

        audio.PlayOneShot(sound_damaged);
        collider.enabled = false;
        Destroy(gameObject, 0.2f);
    }

    void set_owner(GameObject owner)
    {
        _owner = owner;
        gameObject.tag = owner.tag;
    }

    void set_dir(Vector3 dir)
    {
        _dir = dir;
    }

    public void receive_damage(int amount)
    {
        Destroy(gameObject);
    }
}